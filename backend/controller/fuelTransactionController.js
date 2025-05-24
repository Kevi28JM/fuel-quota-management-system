const pool = require('../config/db');
const twilio = require('twilio');

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Add to your .env file
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Add to your .env file
const twilioPhone = process.env.TWILIO_PHONE_NUMBER; // Add to your .env file

// Create Twilio client
const twilioClient = twilio(accountSid, authToken);

// Get fuel quota for a vehicle
exports.getFuelQuota = async (req, res) => {
  const { vehicleId } = req.params;
  
  try {
    // Check if vehicleId is a string representing a QR code or a numeric ID
    let query;
    let params;
    
    if (vehicleId.includes('Vehicle:')) {
      // Extract vehicle number from QR code text
      const vehicleNumber = vehicleId.split('Vehicle:')[1].split(',')[0].trim();
      query = 'SELECT id, vehicleNumber, quota FROM vehicles WHERE vehicleNumber = ?';
      params = [vehicleNumber];
    } else {
      // Assume it's a numeric ID
      query = 'SELECT id, vehicleNumber, quota FROM vehicles WHERE id = ?';
      params = [vehicleId];
    }
    
    const [vehicles] = await pool.execute(query, params);
    
    if (vehicles.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    res.status(200).json({ 
      id: vehicles[0].id,
      vehicleNumber: vehicles[0].vehicleNumber,
      quota: vehicles[0].quota 
    });
  } catch (error) {
    console.error('Error fetching fuel quota:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update fuel quota and record transaction
// Update fuel quota and record transaction
exports.updateFuelQuota = async (req, res) => {
  const { vehicleId, litres, stationId, operatorId } = req.body;
  
  console.log('Received fuel update request:', req.body);
  
  if (!vehicleId || !litres || !stationId || !operatorId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Your verified phone number - MUST be verified in your Twilio account
  // and must match EXACTLY the format shown in your Twilio console
  const VERIFIED_PHONE_NUMBER = '+94717517940'; // Make sure this number is verified
  
  // Start transaction
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    // Get current quota
    const [vehicles] = await connection.execute(
      'SELECT v.id, v.quota, v.vehicleNumber, v.ownerName, vo.phone, vo.email FROM vehicles v LEFT JOIN vehicle_owners vo ON v.userId = vo.id WHERE v.id = ?',
      [vehicleId]
    );
    
    if (vehicles.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    const vehicle = vehicles[0];
    console.log('Retrieved vehicle data:', vehicle);
    
    // Check if there's enough quota
    if (vehicle.quota < litres) {
      await connection.rollback();
      return res.status(400).json({ message: 'Insufficient fuel quota' });
    }

    // Get current station quota
    const [stationData] = await connection.execute(
      'SELECT current_qatar FROM stations WHERE id = ?',
      [stationId]
    );

    if (stationData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Station not found' });
    }

    const stationQuota = stationData[0].current_qatar;
    console.log('Retrieved station quota:', stationQuota);

    // Check if there's enough quota at the station
    if (stationQuota < litres) {
      await connection.rollback();
      return res.status(400).json({ message: 'Insufficient fuel stock at station' });
    }
    
    // Update vehicle quota
    const newQuota = vehicle.quota - litres;
    await connection.execute(
      'UPDATE vehicles SET quota = ? WHERE id = ?',
      [newQuota, vehicleId]
    );

    // Update station quota
    const updatedStationQuota = stationQuota - litres;
    await connection.execute(
      'UPDATE stations SET Current_qatar = ? WHERE id = ?',
      [updatedStationQuota, stationId]
    );
    
    // Record transaction
    const [result] = await connection.execute(
      'INSERT INTO fuel_transactions (vehicle_id, station_id, operator_id, amount) VALUES (?, ?, ?, ?)',
      [vehicleId, stationId, operatorId, litres]
    );
    
    const transactionId = result.insertId;
    
    // Get station name
    const [stations] = await connection.execute(
      'SELECT name FROM stations WHERE id = ?',
      [stationId]
    );
    
    const stationName = stations.length > 0 ? stations[0].name : 'Unknown Station';
    
    // Commit transaction
    await connection.commit();
    
    // Format date for SMS
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    // Send SMS notification
    let smsResult = { sent: false, message: 'No attempt made' };
    
    try {
      // Log Twilio configuration for debugging
      console.log('Twilio Configuration:');
      console.log('Account SID:', accountSid ? 'Set' : 'Not set');
      console.log('Auth Token:', authToken ? 'Set' : 'Not set');
      console.log('From Phone:', twilioPhone);
      console.log('To Phone (verified):', VERIFIED_PHONE_NUMBER);
      
      // Create the message body
      const messageBody = `Fuel Transaction Confirmation: ${litres}L of fuel dispensed to vehicle ${vehicle.vehicleNumber} at ${stationName}. Remaining quota: ${newQuota}L. Date: ${formattedDate}`;
      
      console.log('Creating Twilio message with:');
      console.log('- Body:', messageBody);
      console.log('- From:', twilioPhone);
      console.log('- To:', VERIFIED_PHONE_NUMBER);
      
      // Send the SMS using the verified number
      const message = await twilioClient.messages.create({
        body: messageBody,
        from: twilioPhone,
        to: VERIFIED_PHONE_NUMBER
      });
      
      console.log('SMS sent successfully:', message.sid);
      
      // Update notification status
      await pool.execute(
        'UPDATE fuel_transactions SET notification_sent = 1 WHERE id = ?',
        [transactionId]
      );
      
      smsResult = { 
        sent: true, 
        sid: message.sid,
        message: 'SMS sent successfully'
      };
      
    } catch (smsError) {
      console.error('Failed to send SMS:', smsError);
      
      // Log detailed error information
      if (smsError.code) {
        console.error('Error code:', smsError.code);
      }
      if (smsError.moreInfo) {
        console.error('More info:', smsError.moreInfo);
      }
      
      smsResult = { 
        sent: false, 
        error: smsError.message,
        code: smsError.code || 'unknown'
      };
      
      // We don't want to fail the transaction if SMS fails,
      // so we just log the error and continue
    }
    
    // Return response to client
    res.status(200).json({ 
      message: 'Fuel quota updated successfully', 
      transactionId,
      newQuota,
      smsNotification: smsResult
    });
    
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    console.error('Error updating fuel quota:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Always release the connection
    connection.release();
  }
};

// Get transaction history for a vehicle
exports.getTransactionHistory = async (req, res) => {
  const { vehicleId } = req.params;
  
  try {
    const [transactions] = await pool.execute(
      `SELECT ft.id, ft.amount, ft.transaction_date, s.name as station_name, so.name as operator_name
       FROM fuel_transactions ft
       JOIN stations s ON ft.station_id = s.id
       JOIN station_operator so ON ft.operator_id = so.id
       WHERE ft.vehicle_id = ?
       ORDER BY ft.transaction_date DESC`,
      [vehicleId]
    );
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
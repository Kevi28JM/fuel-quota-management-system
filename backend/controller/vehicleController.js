const pool = require('../config/db'); // Main application database
const motorPool = require('../config/motordb'); // DMT database
const QRCode = require('qrcode');

// Register Vehicle
exports.registerVehicle = async (req, res) => {
  const {
    vehicleNumber,
    chassisNumber,
    engineNumber,
    ownerName,
    registeredDate,
    vehicleType,
    color,
  } = req.body;

  try {
    // Validate input
    if (
      !vehicleNumber || !chassisNumber || !engineNumber || !ownerName || !registeredDate || !vehicleType ||!color) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate vehicle details against mock DMT database (dmt_database)
    const [dmtVehicle] = await motorPool.execute(
      'SELECT * FROM dmt_vehicles WHERE vehicleNumber = ? AND chassisNumber = ? AND engineNumber = ? AND ownerName = ? AND registeredDate = ? AND vehicleType = ?',
      [vehicleNumber, chassisNumber, engineNumber, ownerName, registeredDate, vehicleType]
    );

    console.log('DMT Vehicle Result:', dmtVehicle); // Debug log

    if (dmtVehicle.length === 0) {
      return res.status(400).json({ message: 'Vehicle details do not match Department of Motor Traffic records.' });
    }

    // Check if the vehicle is already registered in the system (fuel_quota_management_system)
    const [existingVehicle] = await pool.execute(
      'SELECT * FROM vehicles WHERE vehicleNumber = ?',
      [vehicleNumber]
    );
    if (existingVehicle.length > 0) {
      return res.status(409).json({ message: 'Vehicle is already registered.' });
    }

    // Generate QR Code
    const qrCodeData = `Vehicle: ${vehicleNumber}, Owner: ${ownerName}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Insert new vehicle into the database (fuel_quota_management_system)
    await pool.execute(
      `INSERT INTO vehicles (vehicleNumber, chassisNumber, engineNumber, ownerName, registeredDate, vehicleType, color, qrCode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vehicleNumber, chassisNumber,engineNumber,ownerName,registeredDate,vehicleType,color,qrCode,
      ]
    );

    res.status(201).json({
      message: 'Vehicle registered successfully.',
      qrCodeData: qrCode,
    });
  } catch (error) {
    console.error('Error registering vehicle:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch all vehicles 
exports.fetchVehicles = async (req, res) => {
  try {
    const [vehicles] = await pool.query('SELECT * FROM vehicles'); // Query to fetch all vehicles
    res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).json({ message: 'Failed to fetch vehicles.' });
  }
};

// Get QR Code for a registered vehicle
exports.getQRCode = async (req, res) => {
  const {  vehicleID  } = req.params;

  try {
    const [vehicleRows] = await pool.execute(
      'SELECT qrCode FROM vehicles WHERE id = ?',
      [vehicleID]
    );

    if (vehicleRows.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    res.status(200).json({ qrCodeData: vehicleRows[0].qrCode });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Fetch all vehicles by owner
exports.getVehiclesByOwner = async (req, res) => {
  const { userId } = req.params;

  try {
    const [vehicleRows] = await pool.execute(
      'SELECT id ,vehicleNumber FROM vehicles WHERE userId = ?',
      [userId]
    );

    if (vehicleRows.length === 0) {
      return res.status(404).json({ message: 'No vehicles found for this owner.' });
    }

    res.status(200).json(vehicleRows);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
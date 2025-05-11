const pool = require('../config/db'); // Import MySQL connection pool
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
      !vehicleNumber ||
      !chassisNumber ||
      !engineNumber ||
      !ownerName ||
      !registeredDate ||
      !vehicleType ||
      !color
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the vehicle is already registered
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

    // Insert new vehicle into the database
    await pool.execute(
      `INSERT INTO vehicles (vehicleNumber, chassisNumber, engineNumber, ownerName, registeredDate, vehicleType, color, qrCode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vehicleNumber,
        chassisNumber,
        engineNumber,
        ownerName,
        registeredDate,
        vehicleType,
        color,
        qrCode,
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
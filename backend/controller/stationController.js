const pool = require("../config/db");

// Register Station
exports.registerStation = async (req, res) => {
  const { name, location, contact} = req.body;
    const ownerId = 3; // Assuming ownerId is hardcoded for now, you can change this later
    const created_at = new Date(); // Get the current date and time
  try {
   
    // Insert new station
    const [result] = await pool.execute(
      "INSERT INTO stations (name, location, owner_id , created_at , contact) VALUES (?, ?, ?, ?,?)",
      [name, location, ownerId,created_at,contact]
    );

    res.status(201).json({ message: "Station registered successfully", stationId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all stations
exports.fetchStations = async (req, res) => {
  try {
    const [stations] = await pool.query('SELECT * FROM stations'); // Query to fetch all stations
    res.status(200).json(stations);
  } catch (err) {
    console.error('Error fetching stations:', err);
    res.status(500).json({ message: 'Failed to fetch stations.' });
  }
};
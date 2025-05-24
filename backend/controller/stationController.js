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


exports.fetchStations = async (req, res) => {
  try {
    const [stations] = await pool.query('SELECT * FROM stations');
    res.status(200).json(stations);
  } catch (err) {
    console.error('Error fetching stations:', err);
    res.status(500).json({ message: 'Failed to fetch stations.' });
  }
};

exports.updateStationQuota = async (req, res) => {
  const stationId = req.params.stationId;
  const { Current_qatar } = req.body;

  if (!stationId || Current_qatar === undefined) {
    return res.status(400).json({ message: 'Station ID and new quota are required.' });
  }

  try {
    const [quota] = await pool.query('SELECT capacity FROM stations WHERE id = ?', [stationId]);

    if (quota.length === 0) {
      return res.status(404).json({ message: 'Station not found.' });
      //check whether the quota is less than the capacity
    } else if (Current_qatar > quota[0].capacity) {
      return res.status(400).json({ message: 'Quota exceeds station capacity.' });
    }
    //update the capacity
    const [result] = await pool.execute(
      'UPDATE stations SET Current_qatar = ? WHERE id = ?',
      [Current_qatar, stationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Station not found.' });
    }

    res.status(200).json({ message: 'Station quota updated successfully.' });
  } catch (err) {
    console.error('Error updating station quota:', err);
    res.status(500).json({ message: 'Failed to update station quota.' });
  }
};

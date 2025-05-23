const { getPendingStationOwnersFromDB } = require('../models/stationOwnerModel');

exports.getPendingStationOwners = async (req, res) => {
  try {
    const owners = await getPendingStationOwnersFromDB();
    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching pending station owners:", error);
    res.status(500).json({ message: error.message || "Failed to fetch pending station owners." });
  }
};

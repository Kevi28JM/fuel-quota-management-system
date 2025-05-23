const stationOwnerModel = require('../models/stationOwnerModel');

exports.getPendingStationOwners = async (req, res) => {
  try {
    const owners = await stationOwnerModel.fetchPendingOwners();
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending owners' });
  }
};

exports.approveStationOwner = async (req, res) => {
  const ownerId = req.params.id;
  try {
    await stationOwnerModel.approveOwner(ownerId);
    res.json({ message: 'Station owner approved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to approve owner' });
  }
};

exports.rejectStationOwner = async (req, res) => {
  const ownerId = req.params.id;
  try {
    await stationOwnerModel.rejectOwner(ownerId);
    res.json({ message: 'Station owner rejected and removed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject owner' });
  }
};

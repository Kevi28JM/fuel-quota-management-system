const express = require('express');
const router = express.Router();
const stationOwnerController = require('../controller/stationOwnerController');

router.get('/pending', stationOwnerController.getPendingStationOwners);
router.post('/:id/approve', stationOwnerController.approveStationOwner);
router.delete('/:id/reject', stationOwnerController.rejectStationOwner);

module.exports = router;

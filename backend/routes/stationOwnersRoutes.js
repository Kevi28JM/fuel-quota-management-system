const express = require('express');
const router = express.Router();
const { 
  getPendingStationOwners, 
  approveStationOwner, 
  rejectStationOwner, 
  removeStationOwner 
} = require('../controller/stationOwnerController');

// Get all pending station owners
router.get('/pending', getPendingStationOwners);
// Approve a station owner (POST expects an object with an "id" property)
router.post('/approve', approveStationOwner);
// Reject a station owner
router.post('/reject', rejectStationOwner);
// Remove a station owner (DELETE with the ownerId in URL)
router.delete('/remove/:id', removeStationOwner);

module.exports = router;
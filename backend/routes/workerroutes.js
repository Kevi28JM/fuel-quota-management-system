const express = require('express');
const router = express.Router();
const workerController = require('../controller/workerController');

// GET all pending workers 
router.get('/pending', workerController.getPendingWorkers);

// Approve a worker (expects a JSON payload: { id: workerId })
router.post('/approve', workerController.approveWorker);

// Reject a worker (expects a JSON payload: { id: workerId })
router.post('/reject', workerController.rejectWorker);

module.exports = router;
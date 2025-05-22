// controllers/stationOperatorController.js
const { createStationOperator } = require('../models/stationOperatorModel');

const registerStationOperator = (req, res) => {
    const { name, nic, username, email, password, station } = req.body;

    if (!name  !nic  !username  !email  !password || !station) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    createStationOperator(req.body, (err, results) => {
        if (err) {
            console.error('Error saving stationOperator:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json({ message: 'Station Operator registered successfully!' });
    });
};

module.exports = { registerStationOperator };
// models/stationOperatorModel.js
const db = require('../config/db');

const createStationOperator = (data, callback) => {
    const { name, nic, username, email, password, station } = data;

    const query = `
        INSERT INTO station_operator (name, nic,  email, password, station_id, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, nic,  email, password, station, "pending"], (err, results) => {
        if (err) {
            console.error("DB Insert error:", err);
            return callback(err, null);
        }
        console.log("DB Insert success:", results);
        callback(null, results);
    });
};


module.exports = { createStationOperator };
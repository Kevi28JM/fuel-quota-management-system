// insert pending station operator
const db = require('../config/db');

const createStationOperator = async (data) => {
  const { name, nic, username, email, password, station } = data;

  const query = `
    INSERT INTO station_operator (name, nic, email, password, station_id, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [results] = await db.query(query, [name, nic, email, password, station, "pending"]);
    console.log("Station operator created successfully:", results);
    return results;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

module.exports = { createStationOperator };

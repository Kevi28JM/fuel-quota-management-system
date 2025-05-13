
require('dotenv').config();
const mysql = require("mysql2/promise"); 

const motorPool = mysql.createPool({
  host: process.env.DMT_DB_HOST,
  user: process.env.DMT_DB_USER,
  password: process.env.DMT_DB_PASSWORD,
  database: process.env.DMT_DB_NAME,
  port: 3307, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection pool by executing a simple query
async function testConnection() {
  try {
    const connection = await motorPool.getConnection();
    console.log('✅ Connected to the MySQL database: ' + process.env.DMT_DB_NAME);
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}

testConnection(); // Call the test function to check the connection

module.exports = motorPool;
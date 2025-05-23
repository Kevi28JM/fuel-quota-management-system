const db = require('../config/db');
const bcrypt = require('bcrypt');

const StationOperator = {
  create: async (data) => {
    const { name, nic, email, password, station } = data;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const query = `
        INSERT INTO station_operator (name, nic, email, password, station_id, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const [results] = await db.query(query, [name, nic, email, hashedPassword, station, "pending"]);
      return results;
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const [operator] = await db.query(
        'SELECT * FROM station_operator WHERE email = ?',
        [email]
      );
      return operator[0] || null;
    } catch (error) {
      console.error('Error finding station operator by email:', error);
      throw error;
    }
  },

  verifyPassword: async (inputPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  },

  getApprovedOperator: async (email, password) => {
    try {
      const operator = await StationOperator.findByEmail(email);
      if (!operator) return null;

      const isPasswordValid = await StationOperator.verifyPassword(password, operator.password);
      if (!isPasswordValid) return null;

      if (operator.status !== 'approved') return null;

      return {
        id: operator.id,
        name: operator.name,
        email: operator.email,
        stationId: operator.station_id,
        status: operator.status
      };
    } catch (error) {
      console.error('Error getting approved operator:', error);
      throw error;
    }
  }
};

module.exports = StationOperator;
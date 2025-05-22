// This file contains the model for the admin table in the database.
const db = require('../config/db');

const createAdmin = async (adminData) => {
    const { username, email, password } = adminData;
    try {
        const query = `
            INSERT INTO admins (username, email, password)
            VALUES (?, ?, ?)
        `;
        const values = [username, email, password];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

const findAdminByEmail = async (email) => {
    try {
        const [admins] = await db.execute(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );
        return admins[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { createAdmin, findAdminByEmail };
const db = require('../config/db');
const bcrypt = require('bcrypt');

const createStationOwner = async (ownerData) => {
    const { ownerName, email, phone, nic, password } = ownerData;
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const registrationDate = new Date();
        const status = "Pending";
        const query = `
            INSERT INTO station_owner 
            (OwnerName, Email, Phone, NIC, Password, RegistrationDate, Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [ownerName, email, phone, nic, hashedPassword, registrationDate, status];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

const findStationOwnerByEmail = async (email) => {
    try {
        const [owners] = await db.execute(
            'SELECT * FROM station_owner WHERE Email = ?',
            [email]
        );
        return owners[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { createStationOwner, findStationOwnerByEmail };
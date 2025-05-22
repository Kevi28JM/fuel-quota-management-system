const db = require('../config/db');
const bcrypt = require('bcrypt');

const createVehicleOwner = async (ownerData) => {
    // Expecting ownerData to include: fullName, email, phone, nic, password
    const { fullName, email, phone, nic, password } = ownerData;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO vehicle_owners 
            (full_name, email, phone, password, nic_number) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [fullName, email, phone, hashedPassword, nic];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

const findVehicleOwnerByEmail = async (email) => {
    try {
        const [owners] = await db.execute(
            'SELECT * FROM vehicle_owners WHERE email = ?',
            [email]
        );
        return owners[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { createVehicleOwner, findVehicleOwnerByEmail };
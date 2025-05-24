const db = require('../config/db');
const bcrypt = require('bcrypt');

//create pending station owner
const createStationOwner = async (ownerData) => {
    const { ownerName, email, phone, nic, password, stationName, location, capacity, Station_Contact } = ownerData;
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const registrationDate = new Date();
        const status = "Pending";
        const query = `
            INSERT INTO Pending_station_and_owner 
            (OwnerName, Email, Phone, NIC, Password, RegistrationDate, Status, StationName, Location, Capacity, Station_Contact) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [ownerName, email, phone, nic, hashedPassword, registrationDate, status, stationName, location, capacity, Station_Contact];
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

const findPendingStationOwnerByEmail = async (email) => {
    try {
        const [owners] = await db.execute(
            'SELECT * FROM Pending_station_and_owner WHERE Email = ?',
            [email]
        );
        return owners[0];
    } catch (error) {
        throw error;
    }
};

const findStationByOwnerId = async (ownerId) => {
    const [rows] = await db.query('SELECT * FROM stations WHERE owner_id = ?', [ownerId]);
    return rows[0]; // Assuming one station per owner
};


module.exports = { createStationOwner, findStationOwnerByEmail ,findStationByOwnerId , findPendingStationOwnerByEmail};
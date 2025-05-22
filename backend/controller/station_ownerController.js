const { createStationOwner, findStationOwnerByEmail } = require('../models/station_ownermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUserController = async (req, res) => {
    try {
        const result = await createStationOwner(req.body);
        res.status(201).json({ message: 'Registered successfully', ownerId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Registration failed.' });
    }
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const owner = await findStationOwnerByEmail(email);
        if (!owner) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Check if the owner's status is "Approved"
        const ownerStatus = owner.Status || owner.status;
        if (ownerStatus !== "Approved") {
            return res.status(403).json({ message: 'Station owner is not approved' });
        }
        // Retrieve hashed password and convert Buffer to string if necessary
        let hashedPassword = owner.Password || owner.password;
        if (Buffer.isBuffer(hashedPassword)) {
            hashedPassword = hashedPassword.toString('utf8');
        }
        if (!hashedPassword || typeof hashedPassword !== 'string') {
            throw new Error("Invalid password hash retrieved from database");
        }
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: owner.id, email: owner.Email || owner.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, user: owner, redirectPath: '/station' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Login failed.' });
    }
};

module.exports = { registerUserController, loginUserController };
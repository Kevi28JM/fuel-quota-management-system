const { createVehicleOwner, findVehicleOwnerByEmail } = require('../models/vehicleOwnermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const registerUserController = async (req, res) => {
    try {
        const result = await createVehicleOwner(req.body);
        res.status(201).json({ message: 'Registered successfully', ownerId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Registration failed.' });
    }
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const owner = await findVehicleOwnerByEmail(email);
        if (!owner) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Sign JWT token with a 1-hour expiry
        const token = jwt.sign(
            { id: owner.id, email: owner.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, user: owner, redirectPath: '/vehicle' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Login failed.' });
    }
};

module.exports = { registerUserController, loginUserController };
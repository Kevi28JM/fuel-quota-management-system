const { createStationOwner, findStationOwnerByEmail } = require('../models/station_ownermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//station owner signup
// station_ownerController.js

const registerUserController = async (req, res) => {
  try {
    const { owner, station } = req.body;

    if (!owner || !station) {
      return res.status(400).json({ message: 'Owner and station data are required.' });
    }

    const ownerData = {
      ownerName: owner.name,
      email: owner.email,
      phone: owner.phone,
      nic: owner.nic,
      password: owner.password,
      stationName: station.name,
      location: station.location,
      capacity: station.capacity,
      Station_Contact: station.contact,
    };

    const result = await createStationOwner(ownerData);
    res.status(201).json({ message: 'Registered successfully', ownerId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Registration failed.' });
  }
};


//station owner login
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
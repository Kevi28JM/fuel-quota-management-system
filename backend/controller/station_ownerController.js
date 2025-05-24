const { createStationOwner, findStationOwnerByEmail,findStationByOwnerId ,findPendingStationOwnerByEmail} = require('../models/station_ownermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//station owner signup

const registerUserController = async (req, res) => {
  try {
    const { owner, station } = req.body;

    if (!owner || !station) {
      return res.status(400).json({ message: 'Owner and station data are required.' });
    }

    // Check if the email is already registered in station_owner table
    const existingOwner = await findStationOwnerByEmail(owner.email);
    if (existingOwner) {
      return res.status(409).json({ message: 'Email is already registered.' });
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
    
    if (owner) {

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

      const station = await findStationByOwnerId(owner.OwnerID);
      if (!station) {
        return res.status(404).json({ message: 'Station not found for this owner' });
      }

      const token = jwt.sign(
        { id: owner.id, email: owner.Email || owner.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        token,
        user: owner,
        stationId: station.id,
        redirectPath: '/station'
      });
    }

    // If not in approved table, check pending table
    const pendingOwner = await findPendingStationOwnerByEmail(email);
    if (pendingOwner) {
      return res.status(403).json({ message: 'Station owner and station is not approved yet' });
    }

    // If not in either table
    return res.status(401).json({ message: 'User not found' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

module.exports = { registerUserController, loginUserController };
const { createAdmin, findAdminByEmail } = require('../models/adminmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'default_secret_key';

const adminSignup = async (req, res) => {
    const { username, email, password, secretKey } = req.body;
    
    // Validate secret key
if (secretKey !== ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid secret key' });
}
    
    try {
        // Check if admin already exists
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await createAdmin({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Admin signed up successfully', adminId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Signup failed.' });
    }
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await findAdminByEmail(email);
        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: admin, redirectPath: '/admin' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Login failed.' });
    }
};

module.exports = { adminSignup, loginUserController };
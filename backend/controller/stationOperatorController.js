const StationOperator = require('../models/stationOperatorModel');

const registerStationOperator = async (req, res) => {
  const { name, nic, email, password, station } = req.body;

  if (!name || !nic || !email || !password || !station) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required' 
    });
  }

  try {
    await StationOperator.create(req.body);
    return res.status(201).json({ 
      success: true,
      message: 'Station Operator registered successfully! Status pending approval.' 
    });
  } catch (err) {
    console.error('Error saving stationOperator:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

const loginStationOperator = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  try {
    const operator = await StationOperator.getApprovedOperator(email, password);

    if (!operator) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or account not approved'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      operator: {
        id: operator.id,
        name: operator.name,
        email: operator.email,
        stationId: operator.stationId
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getStations = async (req, res) => {
  try {
    const stations = await StationOperator.getAllStations();
    res.status(200).json(stations);
    console.log('Fetched stations:', stations);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stations'
    });
  }
};

module.exports = {
  registerStationOperator,
  loginStationOperator,
  getStations
};
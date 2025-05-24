import axios from 'axios';

// Base API URL (You can change this based on your deployment)
const API_URL = 'http://localhost:5000/api/stations';

// Service to handle the station registration
export const registerStation = async (stationData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, stationData);
    return response.data;
  } catch (error) {
    // Return error message if request fails
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error registering station');
    }
  }
};

// get all stations
export const fetchStations = async () => {
  try {
    const res = await axios.get('http://localhost:5000/station'); // Adjust endpoint if needed
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch stations.');
  }
};

//update station quota
export const updateStationQuota = async (stationId, newQuota) => {
  try {
    const res = await axios.put(`http://localhost:5000/station/updateQuota/${stationId}`, {
      Current_qatar: newQuota,
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to update quota.';
    throw new Error(message);
  }
};



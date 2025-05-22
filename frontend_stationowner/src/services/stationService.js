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



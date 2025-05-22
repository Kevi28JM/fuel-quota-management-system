import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicle'; 

export const registerVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, vehicleData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error registering vehicle');
    }
  }
};
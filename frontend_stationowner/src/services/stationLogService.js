
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getStationLogs = async (stationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/station/logs/${stationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

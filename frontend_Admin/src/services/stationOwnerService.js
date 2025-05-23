import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getPendingStationOwners = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/station-owners/pending`);
  return response.data;
};

export const approveStationOwner = async (ownerId) => {
  const response = await axios.post(`${API_BASE_URL}/api/station-owners/${ownerId}/approve`);
  return response.data;
};

export const rejectStationOwner = async (ownerId) => {
  const response = await axios.delete(`${API_BASE_URL}/api/station-owners/${ownerId}/reject`);
  return response.data;
};


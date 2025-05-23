import axios from 'axios';

// Use a default if the environment variable is not defined.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getPendingWorkers = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/workers/pending`);
    return response.data;
};

export const approveWorker = async (workerId) => {
    const response = await axios.post(`${API_BASE_URL}/api/workers/approve`, { id: workerId });
    return response.data;
};

export const rejectWorker = async (workerId) => {
    const response = await axios.post(`${API_BASE_URL}/api/workers/reject`, { id: workerId });
    return response.data;
};

export const removeWorker = async (workerId) => {
    const response = await axios.delete(`${API_BASE_URL}/api/workers/remove/${workerId}`);
    return response.data;
};
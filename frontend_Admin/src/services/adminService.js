const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const adminSignup = async (adminData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Admin signup failed.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred during admin signup.');
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login.');
    }
};
export const registerUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:5000/api/vehicle_owner/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred during registration.');
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/vehicle_owner/login', {
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
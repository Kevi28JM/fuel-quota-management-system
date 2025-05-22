export const registerUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:5000/api/station_owner/register', {
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

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during registration.');
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/station_owner/login', {
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

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login.');
    }
};
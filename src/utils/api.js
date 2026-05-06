const API_URL = 'http://localhost:5000/api';

const api = async (endpoint, options = {}) => {
    const token = localStorage.getItem('naryn_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['x-auth-token'] = token;
    }

    console.log(`API Request: ${options.method || 'GET'} ${endpoint}`, { headers });

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error ${response.status}:`, data);
            throw new Error(data.msg || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Fetch Failure:', error);
        throw error;
    }
};

export default api;

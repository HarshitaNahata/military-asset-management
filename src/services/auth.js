import api from './api';

const authService = {
    // Login user
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    },

    // Register user (admin only)
    register: async (userData) => {
        return await api.post('/auth/register', userData);
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
    },

    // Get current user
    getCurrentUser: async () => {
        return await api.get('/auth/me');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;

// // services/api.js
// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // Add JWT interceptor
// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;

// services/api.js
import axios from 'axios';

// Set up the base URL using environment variable (fallback to localhost)
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor: Attach JWT token if available
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor: Handle errors globally (e.g., 401 Unauthorized)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Optional: handle unauthorized globally
            if (error.response.status === 401) {
                // For example, redirect to login or clear user data
                // localStorage.removeItem('token');
                // window.location.href = '/login';
                // Optionally, you can dispatch a logout action here if using Redux
                console.warn('Unauthorized, redirecting to login...');
            }
        }
        return Promise.reject(error);
    }
);

export default api;

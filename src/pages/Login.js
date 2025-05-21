// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please enter both email and password.');
            return;
        }
        // Dispatch login action (replace with your real logic)
        try {
            await dispatch(login(form)).unwrap(); // .unwrap() throws if rejected
            navigate('/');
        } catch (err) {
            setError('Invalid credentials or server error.');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f6fa' }}>
            <Paper elevation={3} sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
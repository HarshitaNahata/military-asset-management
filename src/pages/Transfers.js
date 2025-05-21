// pages/Transfers.js

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Transfers = () => {
    const [formData, setFormData] = useState({
        assetType: '',
        quantity: '',
        fromBase: '',
        toBase: ''
    });
    const [transferHistory, setTransferHistory] = useState([
        {
            id: 1,
            date: '2024-03-20',
            assetType: 'Ammunition',
            quantity: 100,
            fromBase: 'Base Alpha',
            toBase: 'Base Bravo'
        }
    ]);
    const [error, setError] = useState('');

    const columns = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'assetType', headerName: 'Asset Type', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'fromBase', headerName: 'From Base', width: 200 },
        { field: 'toBase', headerName: 'To Base', width: 200 }
    ];

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Simple validation
        if (
            !formData.assetType ||
            !formData.quantity ||
            !formData.fromBase ||
            !formData.toBase
        ) {
            setError('Please fill all fields.');
            return;
        }
        // Add new transfer to history
        setTransferHistory([
            ...transferHistory,
            {
                id: transferHistory.length + 1,
                date: new Date().toISOString().slice(0, 10),
                ...formData
            }
        ]);
        // Reset form
        setFormData({
            assetType: '',
            quantity: '',
            fromBase: '',
            toBase: ''
        });
    };

    return (
        <Box sx={{ p: 4 }}>
            <h2>Record New Transfer</h2>
            <Box
                component="form"
                sx={{ display: 'flex', gap: 2, mb: 4 }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Asset Type"
                    name="assetType"
                    value={formData.assetType}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="From Base"
                    name="fromBase"
                    value={formData.fromBase}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="To Base"
                    name="toBase"
                    value={formData.toBase}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit Transfer
                </Button>
            </Box>
            {error && (
                <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>
            )}
            <h2>Transfer History</h2>
            <Box sx={{ height: 400 }}>
                <DataGrid rows={transferHistory} columns={columns} pageSize={5} />
            </Box>
        </Box>
    );
};

export default Transfers;
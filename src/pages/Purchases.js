// pages/Purchases.js
import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Container, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Purchases = () => {
    const [formData, setFormData] = useState({
        assetType: '',
        quantity: '',
        base: ''
    });

    const [formError, setFormError] = useState('');

    // In a real app, purchaseHistory would be in state or from Redux/API
    const [purchaseHistory, setPurchaseHistory] = useState([
        { id: 1, date: '2024-03-15', assetType: 'Rifles', quantity: 50, base: 'Base Alpha' }
    ]);

    // Filter states
    const [dateFilter, setDateFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const columns = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'assetType', headerName: 'Asset Type', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'base', headerName: 'Base', width: 200 }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setFormError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.assetType || !formData.quantity || !formData.base) {
            setFormError('Please fill all required fields');
            return;
        }

        // Create new purchase entry
        const newPurchase = {
            id: purchaseHistory.length + 1,
            date: new Date().toISOString().split('T')[0],
            assetType: formData.assetType,
            quantity: parseInt(formData.quantity),
            base: formData.base
        };

        // Update purchase history
        setPurchaseHistory([...purchaseHistory, newPurchase]);

        // Reset form
        setFormData({ assetType: '', quantity: '', base: '' });

        // In a real app, we would dispatch an action or call API here
    };

    // Filter purchase history
    const filteredHistory = purchaseHistory.filter(item => {
        return (!dateFilter || item.date.includes(dateFilter)) &&
            (!typeFilter || item.assetType === typeFilter);
    });

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Purchases</Typography>

            {/* New Purchase Form */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Record New Purchase
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="asset-type-label">Asset Type</InputLabel>
                        <Select
                            labelId="asset-type-label"
                            name="assetType"
                            value={formData.assetType}
                            onChange={handleChange}
                            label="Asset Type"
                        >
                            <MenuItem value="Rifles">Rifles</MenuItem>
                            <MenuItem value="Vehicles">Vehicles</MenuItem>
                            <MenuItem value="Ammunition">Ammunition</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="quantity"
                        label="Quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="base-label">Select Base</InputLabel>
                        <Select
                            labelId="base-label"
                            name="base"
                            value={formData.base}
                            onChange={handleChange}
                            label="Select Base"
                        >
                            <MenuItem value="Base Alpha">Base Alpha</MenuItem>
                            <MenuItem value="Base Bravo">Base Bravo</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" type="submit">
                        Submit Purchase
                    </Button>
                </Box>

                {formError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {formError}
                    </Typography>
                )}
            </Paper>

            {/* Purchase History */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Purchase History</Typography>

                {/* Filters */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        label="Date Filter"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        size="small"
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Type Filter</InputLabel>
                        <Select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            label="Type Filter"
                            size="small"
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Rifles">Rifles</MenuItem>
                            <MenuItem value="Vehicles">Vehicles</MenuItem>
                            <MenuItem value="Ammunition">Ammunition</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ height: 400 }}>
                    <DataGrid
                        rows={filteredHistory}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        disableSelectionOnClick
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default Purchases;
// pages/Purchases.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Purchases = () => {
    const [formData, setFormData] = useState({
        assetType: '',
        quantity: '',
        base: ''
    });

    const purchaseHistory = [
        { id: 1, date: '2024-03-15', assetType: 'Rifles', quantity: 50, base: 'Base Alpha' }
    ];

    const columns = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'assetType', headerName: 'Asset Type', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'base', headerName: 'Base', width: 200 }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <h2>Record New Purchase</h2>
            <Box component="form" sx={{ mb: 4 }}>
                <TextField
                    label="Asset Type"
                    sx={{ mr: 2 }}
                    value={formData.assetType}
                    onChange={e => setFormData({ ...formData, assetType: e.target.value })}
                />
                <TextField
                    label="Quantity"
                    type="number"
                    sx={{ mr: 2 }}
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                />
                <Button variant="contained">Submit Purchase</Button>
            </Box>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={purchaseHistory}
                    columns={columns}
                    pageSize={5}
                />
            </div>
        </Box>
    );
};

export default Purchases;
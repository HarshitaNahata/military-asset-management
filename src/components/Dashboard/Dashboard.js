// components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import MetricCard from './MetricCard';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        date: '',
        base: '',
        equipmentType: ''
    });

    const metrics = [
        { title: 'Opening Balance', value: 1500 },
        { title: 'Closing Balance', value: 1350 },
        { title: 'Net Movement', value: 200 },
        { title: 'Assigned Assets', value: 85 },
        { title: 'Expended Assets', value: 65 }
    ];

    return (
        <div style={{ padding: 20 }}>
            {/* Filter Section */}
            <div style={{ marginBottom: 30 }}>
                <Select
                    value={filters.base}
                    onChange={e => setFilters({ ...filters, base: e.target.value })}
                    displayEmpty
                    sx={{ mr: 2, width: 200 }}
                >
                    <MenuItem value="">All Bases</MenuItem>
                    <MenuItem value="base-1">Base Alpha</MenuItem>
                    <MenuItem value="base-2">Base Bravo</MenuItem>
                </Select>

                <Select
                    value={filters.equipmentType}
                    onChange={e => setFilters({ ...filters, equipmentType: e.target.value })}
                    displayEmpty
                    sx={{ width: 200 }}
                >
                    <MenuItem value="">All Equipment</MenuItem>
                    <MenuItem value="weapons">Weapons</MenuItem>
                    <MenuItem value="vehicles">Vehicles</MenuItem>
                    <MenuItem value="ammo">Ammunition</MenuItem>
                </Select>
            </div>

            {/* Metrics Grid */}
            <Grid container spacing={3}>
                {metrics.map((metric, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <MetricCard title={metric.title} value={metric.value} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Dashboard;
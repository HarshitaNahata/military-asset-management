// components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Box, Typography, Container, Modal } from '@mui/material';
import MetricCard from './MetricCard';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        date: '',
        base: '',
        equipmentType: ''
    });

    const [showMovementDetails, setShowMovementDetails] = useState(false);

    const metrics = [
        { title: 'Opening Balance', value: 1500 },
        { title: 'Closing Balance', value: 1350 },
        { title: 'Net Movement', value: 200 },
        { title: 'Assigned Assets', value: 85 },
        { title: 'Expended Assets', value: 65 }
    ];

    const movementDetails = {
        purchases: 250,
        transferIn: 150,
        transferOut: 200
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleMetricClick = (title) => {
        if (title === 'Net Movement') {
            setShowMovementDetails(true);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Asset Dashboard</Typography>

            {/* Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Date</InputLabel>
                    <Select
                        name="date"
                        value={filters.date}
                        label="Date"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="week">This Week</MenuItem>
                        <MenuItem value="month">This Month</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Base</InputLabel>
                    <Select
                        name="base"
                        value={filters.base}
                        label="Base"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="base1">Base Alpha</MenuItem>
                        <MenuItem value="base2">Base Bravo</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Equipment Type</InputLabel>
                    <Select
                        name="equipmentType"
                        value={filters.equipmentType}
                        label="Equipment Type"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="weapons">Weapons</MenuItem>
                        <MenuItem value="vehicles">Vehicles</MenuItem>
                        <MenuItem value="ammunition">Ammunition</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Metrics */}
            <Grid container spacing={3}>
                {metrics.map((metric) => (
                    <Grid item xs={12} sm={6} md={4} key={metric.title}>
                        <MetricCard
                            title={metric.title}
                            value={metric.value}
                            onClick={() => handleMetricClick(metric.title)}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Net Movement Details Modal */}
            <Modal
                open={showMovementDetails}
                onClose={() => setShowMovementDetails(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Net Movement Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MetricCard title="Purchases" value={movementDetails.purchases} />
                        </Grid>
                        <Grid item xs={12}>
                            <MetricCard title="Transfer In" value={movementDetails.transferIn} />
                        </Grid>
                        <Grid item xs={12}>
                            <MetricCard title="Transfer Out" value={movementDetails.transferOut} />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Container>
    );
};

export default Dashboard;
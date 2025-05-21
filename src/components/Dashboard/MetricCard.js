import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

const MetricCard = ({ title, value }) => (
    <Card sx={{ minWidth: 200, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" color="primary">
                {value}
            </Typography>
        </CardContent>
    </Card>
);

MetricCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MetricCard;

import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import MetricCard from './MetricCard';

const NetMovementModal = ({ open, onClose, movementDetails }) => {
    const { purchases, transferIn, transferOut } = movementDetails || { purchases: 0, transferIn: 0, transferOut: 0 };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="net-movement-modal-title"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 500 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography id="net-movement-modal-title" variant="h6" component="h2">
                        Net Movement Details
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MetricCard
                            title="Purchases"
                            value={purchases}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MetricCard
                            title="Transfer In"
                            value={transferIn}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MetricCard
                            title="Transfer Out"
                            value={transferOut}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default NetMovementModal;
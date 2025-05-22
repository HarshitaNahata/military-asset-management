// components/Common/ProtectedRoute.js'

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRoles }) => {
    const { user } = useSelector(state => state.auth); // Get entire user object
    const role = user?.role; // Safely access role

    // 1. Check if user exists (authentication)
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Check if user has required role (authorization)
    if (!requiredRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />; // Render child routes
};

export default ProtectedRoute;

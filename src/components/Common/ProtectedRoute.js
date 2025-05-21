// components/Common/ProtectedRoute.js

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRoles }) => {
    const { role } = useSelector(state => state.auth);

    if (!requiredRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

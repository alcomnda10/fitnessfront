import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('auth_user');

    // ❌ Not logged in
    if (!token || !userData) {
        return <Navigate to="/login" replace />;
    }

    let user = null;
    try {
        user = JSON.parse(userData);
    } catch (err) {
        // ⚠️ Invalid user data (corrupted or tampered)
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        return <Navigate to="/login" replace />;
    }

    // ❌ If admin route required, but user is not admin
    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // ✅ Authorized user (or admin if required)
    return <>{children}</>;
};

export default PrivateRoute;

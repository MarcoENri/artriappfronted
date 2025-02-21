import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Security {
  token: boolean;
  redirectTo: string;
  children?: React.ReactNode;
}

export default function PrivateRoute({ token, redirectTo }: Security) {
    if (!token) {
        return <Navigate to={redirectTo} />;
    }
    return <Outlet />;
}


import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../ui/Loader";

interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    requireProfileComplete?: boolean;
    publicOnly?: boolean;
}

export const ProtectedRoute = ({
    children,
    requireAuth = true,
    requireAdmin = false,
    requireProfileComplete = true,
    publicOnly = false
}: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, isProfileComplete, role } = useAuthContext();
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (publicOnly && isAuthenticated) {
        if (role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
        if (isProfileComplete) {
            return <Navigate to="/user" replace />;
        }
        return <Navigate to="/complete-profile" replace />;
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    if (requireAuth && isAuthenticated) {
        if (requireProfileComplete && !isProfileComplete) {
            return <Navigate to="/complete-profile" replace />;
        }

        if (location.pathname === '/complete-profile' && (isProfileComplete || role === 'admin')) {
            const target = role === 'admin' ? '/admin' : '/user';
            return <Navigate to={target} replace />;
        }

        if (requireAdmin && role !== 'admin') {
            return <Navigate to="/user" replace />;
        }

        if (role === 'admin' && !requireAdmin && location.pathname.startsWith('/user')) {
            return <Navigate to="/admin" replace />;
        }
    }

    return <>{children}</>;
};

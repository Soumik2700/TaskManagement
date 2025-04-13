import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    localStorage.clear();
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error("Invalid token:", err.message);
                localStorage.clear();
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }

        setTimeout(() => {
            setCheckingAuth(false); // simulate delay for spinner
        }, 500); // Optional delay for smoother experience
    }, []);

    if (checkingAuth) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;

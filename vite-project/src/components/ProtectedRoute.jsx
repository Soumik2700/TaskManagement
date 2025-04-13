import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
    const token = localStorage.getItem("authToken");

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.clear();
                return <Navigate to="/" replace />;
            }

            // Token is valid
            return <Outlet />;
        } catch (err) {
            console.error("Invalid token:", err.message);
            localStorage.clear();
            return <Navigate to="/" replace />;
        }
    }

    // No token
    return <Navigate to="/" replace />;
}

export default ProtectedRoute;

import PropTypes from "prop-types";
import Loader from "../components/Loader";
import { Navigate, useLocation } from "react-router";
import toast from "react-hot-toast";


const Privateroute = ({ children }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const AuthUserName = import.meta.env.VITE_AUTH_USERNAME;
    const AuthPassword = import.meta.env.VITE_AUTH_PASSWORD;
    const loading = false;
    if (loading) {
        return (
            <Loader />
        );
    }

    // Ensure user exists and has an email property before rendering children
    if (user) {
        if (AuthUserName == user.username && AuthPassword == user.password) {

            return children;
        } else {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

};

Privateroute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Privateroute;

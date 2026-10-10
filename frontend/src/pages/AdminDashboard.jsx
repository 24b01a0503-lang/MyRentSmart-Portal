import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalProperties: 0,
        totalBookings: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/dashboard/admin");

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="admin-page">

            <nav className="navbar">

                <h2 className="logo">

                    <FaHome />

                    RentSmart

                </h2>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </nav>

            <div className="dashboard-content">

                <h1>ADMIN DASHBOARD</h1>

                <p>

                    Manage users, properties and bookings from one place.

                </p>

                {/* Dashboard Statistics */}

                <div className="stats-container">

                    <div className="stat-card">

                        <FaUsers className="stat-icon users" />

                        <div>

                            <h2>{dashboard.totalUsers}</h2>

                            <span>Total Users</span>

                        </div>

                    </div>

                    <div className="stat-card">

                        <FaBuilding className="stat-icon properties" />

                        <div>

                            <h2>{dashboard.totalProperties}</h2>

                            <span>Total Properties</span>

                        </div>

                    </div>

                    <div className="stat-card">

                        <FaClipboardList className="stat-icon bookings" />

                        <div>

                            <h2>{dashboard.totalBookings}</h2>

                            <span>Total Bookings</span>

                        </div>

                    </div>

                </div>

                {/* Management Cards */}

                <div className="dashboard-cards">

                    <div className="card">

                        <FaUsers className="card-icon" />

                        <h3>Manage Users</h3>

                        <p>

                            View and manage all registered users.

                        </p>

                        <button
                            onClick={() => navigate("/admin/users")}
                        >

                            Manage Users

                        </button>

                    </div>

                    <div className="card">

                        <FaBuilding className="card-icon" />

                        <h3>Manage Properties</h3>

                        <p>

                            View and manage all listed properties.

                        </p>

                        <button
                            onClick={() => navigate("/admin/properties")}
                        >

                            Manage Properties

                        </button>

                    </div>

                    <div className="card">

                        <FaClipboardList className="card-icon" />

                        <h3>Manage Bookings</h3>

                        <p>

                            View and manage all booking requests.

                        </p>

                        <button
                            onClick={() => navigate("/admin/bookings")}
                        >

                            Manage Bookings

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;
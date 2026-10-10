import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/TenantDashboard.css";

function TenantDashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (

        <div className="tenant-page">

            <nav className="navbar">

                <h2 className="logo">
                    <FaHome /> RentSmart
                </h2>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt /> Logout
                </button>

            </nav>

            <div className="dashboard-content">

                <h1>Welcome, Tenant 👋</h1>

                <p>
                    Find your perfect rental home and manage your bookings with ease.
                </p>

                <div className="dashboard-cards">

                    <div className="card">

                        <FaBuilding className="card-icon"/>

                        <h3>Browse Properties</h3>

                        <p>
                            Explore available rental properties.
                        </p>

                        <button
                            onClick={() => navigate("/available-properties")}
                        >
                            Open
                        </button>

                    </div>

                    <div className="card">

                        <FaClipboardList className="card-icon"/>

                        <h3>My Bookings</h3>

                        <p>
                            Track all your booking requests.
                        </p>

                        <button
                            onClick={() => navigate("/my-bookings")}
                        >
                            Open
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TenantDashboard;
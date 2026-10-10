import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaBuilding,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/OwnerDashboard.css";

function OwnerDashboard() {

    const navigate = useNavigate();

    return (

        <div className="owner-page">

            <nav className="navbar">

                <h2 className="logo">
                    <FaHome /> RentSmart
                </h2>

                <button
                    className="logout-btn"
                    onClick={() => navigate("/")}
                >
                    <FaSignOutAlt /> Logout
                </button>

            </nav>

            <div className="dashboard-content">

                <h1>Welcome, Owner 👋</h1>

                <p>
                    Manage your properties and booking requests easily.
                </p>

                <div className="dashboard-cards">

                    <div className="card">
                        <FaPlusCircle className="card-icon" />
                        <h3>Add Property</h3>
                        <p>Add a new property for rent.</p>

                        <button
                            onClick={() => navigate("/add-property")}
                        >
                            Open
                        </button>
                    </div>

                    <div className="card">
                        <FaBuilding className="card-icon" />
                        <h3>My Properties</h3>
                        <p>View and manage your listed properties.</p>

                        <button
                            onClick={() => navigate("/properties")}
                        >
                            Open
                        </button>
                    </div>

                    <div className="card">
                        <FaClipboardList className="card-icon" />
                        <h3>Booking Requests</h3>
                        <p>Accept or reject booking requests.</p>

                        <button
                            onClick={() => navigate("/owner-bookings")}
                        >
                            Open
                        </button>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default OwnerDashboard;
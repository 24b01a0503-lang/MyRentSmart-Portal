import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaUser,
    FaSearch,
    FaPhoneAlt,
    FaArrowLeft
} from "react-icons/fa";

import api, { BASE_URL } from "../services/api";
import "../styles/AvailableProperties.css";

function AvailableProperties() {

    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [myBookings, setMyBookings] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const loadProperties = async () => {

            try {

                const propertyResponse = await api.get("/properties");
                setProperties(propertyResponse.data);

                const bookingResponse = await api.get(`/bookings/tenant/${user.email}`);
                setMyBookings(bookingResponse.data);

            } catch (error) {

                console.log("Error loading properties:", error);

            } finally {

                setLoading(false);

            }

        };

        loadProperties();

    }, [user.email]);

    const contactOwner = (email) => {

        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
            "_blank"
        );

    };

    const bookProperty = async (property) => {

        try {

            const booking = {

                propertyId: property.id,
                tenantEmail: user.email,
                ownerEmail: property.ownerEmail,
                bookingDate: new Date().toISOString().split("T")[0],
                status: "PENDING"

            };

            await api.post("/bookings", booking);

            alert("Booking Request Sent Successfully.");

            const bookingResponse = await api.get(`/bookings/tenant/${user.email}`);
            setMyBookings(bookingResponse.data);

        } catch (error) {

            console.log(error);
            alert("Booking Failed.");

        }

    };

    const filteredProperties = properties.filter((property) =>
        property.location.toLowerCase().includes(search.toLowerCase())
    );

    const isBooked = (propertyId) => {
        return myBookings.some(
            (booking) => booking.propertyId === propertyId
        );
    };

    return (

        <div className="available-container">

            <header className="navbar">

                <div className="logo">
                    <FaHome />
                    <span>RentSmart</span>
                </div>

                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/tenant")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </header>

            <section className="search-section">

                <h1>Find Your Dream Home</h1>

                <p>
                    Search verified rental properties in your preferred location.
                </p>

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search by Location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </section>

            {loading ? (

                <div className="loading">
                    Loading Properties...
                </div>

            ) : (

                <div className="property-grid">

                    {filteredProperties.length === 0 ? (

                        <div className="no-property">
                            <FaHome className="empty-icon" />
                            <h2>No Properties Found</h2>
                            <p>Try another location.</p>
                        </div>

                    ) : (

                        filteredProperties.map((property) => (

                            <div
                                className="property-card"
                                key={property.id}
                            >

                                <div className="property-image-container">

                                    {property.imageUrl ? (

                                        <img
                                            src={`${BASE_URL}/uploads/${property.imageUrl}`}
                                            alt={property.title}
                                            className="property-image"
                                        />

                                    ) : (

                                        <div className="property-image placeholder">
                                            <FaHome size={70} />
                                        </div>

                                    )}

                                </div>

                                <div className="property-content">

                                    <h2>{property.title}</h2>

                                    <p>
                                        <FaMapMarkerAlt className="icon" />
                                        {property.location}
                                    </p>

                                    <p>
                                        <FaRupeeSign className="icon" />
                                        ₹ {property.rent} / month
                                    </p>

                                    <p className="description">
                                        {property.description}
                                    </p>

                                    <p>
                                        <FaUser className="icon" />
                                        {property.ownerEmail}
                                    </p>

                                    <div className="button-row">

                                        <button
                                            className="contact-btn"
                                            onClick={() =>
                                                contactOwner(property.ownerEmail)
                                            }
                                        >
                                            <FaPhoneAlt />
                                            Contact Owner
                                        </button>

                                        <button
                                            className="book-btn"
                                            disabled={isBooked(property.id)}
                                            onClick={() => bookProperty(property)}
                                        >
                                            {isBooked(property.id)
                                                ? "Already Booked"
                                                : "Book Now"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

            <footer className="footer">

                <h3>RentSmart Portal</h3>

                <p>
                    Find verified rental properties quickly and securely.
                </p>

                <p>© 2026 RentSmart. All Rights Reserved.</p>

            </footer>

        </div>

    );

}

export default AvailableProperties;
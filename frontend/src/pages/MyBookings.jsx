import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList,
    FaHome,
    FaUser,
    FaCalendarAlt,
    FaArrowLeft
} from "react-icons/fa";

import api from "../services/api";
import "../styles/MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const response = await api.get(`/bookings/tenant/${user.email}`);
                setBookings(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchBookings();



    }, [user.email]);
    const cancelBooking = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        try {

            await api.delete(`/bookings/${id}`);

            alert("Booking Cancelled Successfully.");

            const response = await api.get(`/bookings/tenant/${user.email}`);
            setBookings(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Cancel Booking.");

        }

    };

    return (

        <div className="my-bookings-page">

            <div className="booking-header">

                <h1>My Bookings</h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/tenant")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </div>

            {bookings.length === 0 ? (

                <div className="empty-card">

                    <FaClipboardList className="empty-icon" />

                    <h2>No Bookings Found</h2>

                    <p>You haven't booked any property yet.</p>

                </div>

            ) : (

                <div className="booking-grid">

                    {bookings.map((booking) => (

                        <div
                            className="booking-card"
                            key={booking.id}
                        >

                            <h2>Booking #{booking.id}</h2>

                            <p>

                                <FaHome className="icon"/>

                                Property ID :
                                <strong>{booking.propertyId}</strong>

                            </p>

                            <p>

                                <FaUser className="icon"/>

                                {booking.ownerEmail}

                            </p>

                            <p>

                                <FaCalendarAlt className="icon"/>

                                {booking.bookingDate}

                            </p>

                            <span
                                className={`status ${booking.status.toLowerCase()}`}
                            >
    {booking.status}
</span>

                            {booking.status === "PENDING" && (

                                <button
                                    className="cancel-btn"
                                    onClick={() => cancelBooking(booking.id)}
                                >
                                    Cancel Booking
                                </button>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default MyBookings;
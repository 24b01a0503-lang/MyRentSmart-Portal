import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList,
    FaUser,
    FaHome,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowLeft
} from "react-icons/fa";

import api from "../services/api";
import "../styles/OwnerBookings.css";

function OwnerBookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const response = await api.get(`/bookings/owner/${user.email}`);
                setBookings(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchBookings();

    }, [user.email]);

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/bookings/${id}/status`, {
                status: status
            });

            alert("Booking updated successfully!");

            const response = await api.get(`/bookings/owner/${user.email}`);
            setBookings(response.data);
        } catch (error) {

            console.error(error);

            alert("Failed to update booking!");

        }

    };

    return (

        <div className="booking-page">

            <div className="booking-header">

                <h1>Booking Requests</h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/owner")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </div>

            {bookings.length === 0 ? (

                <div className="empty-booking">

                    <FaClipboardList className="empty-icon"/>

                    <h2>No Booking Requests</h2>

                    <p>You don't have any booking requests yet.</p>

                </div>

            ) : (

                <div className="booking-grid">

                    {bookings.map((booking) => (

                        <div
                            className="booking-card"
                            key={booking.id}
                        >

                            <h2>
                                Booking #{booking.id}
                            </h2>

                            <p>
                                <FaHome className="icon"/>
                                Property ID :
                                <strong>{booking.propertyId}</strong>
                            </p>

                            <p>
                                <FaUser className="icon"/>
                                {booking.tenantEmail}
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

                                <div className="action-buttons">

                                    <button
                                        className="accept-btn"
                                        onClick={() =>
                                            updateStatus(
                                                booking.id,
                                                "BOOKED"
                                            )
                                        }
                                    >
                                        <FaCheckCircle />
                                        Accept
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() =>
                                            updateStatus(
                                                booking.id,
                                                "REJECTED"
                                            )
                                        }
                                    >
                                        <FaTimesCircle />
                                        Reject
                                    </button>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default OwnerBookings;
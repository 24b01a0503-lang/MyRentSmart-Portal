import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaClipboardList,
    FaHome,
    FaUser,
    FaCalendarAlt,
    FaTrash
} from "react-icons/fa";

import api from "../services/api";
import "../styles/AdminBookings.css";

function AdminBookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get("/bookings");
            setBookings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBooking = async (id) => {

        if (!window.confirm("Delete this booking?"))
            return;

        try {

            await api.delete(`/bookings/${id}`);
            fetchBookings();

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div className="admin-bookings-page">

            <div className="booking-header">

                <h1>
                    <FaClipboardList />
                    Manage Bookings
                </h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/admin")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </div>

            {bookings.length === 0 ? (

                <div className="empty-booking">

                    <FaClipboardList className="empty-icon"/>

                    <h2>No Bookings Available</h2>

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
                                Tenant :
                                {booking.tenantEmail}
                            </p>

                            <p>
                                <FaUser className="icon"/>
                                Owner :
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

                            <button
                                className="delete-btn"
                                onClick={() => deleteBooking(booking.id)}
                            >
                                <FaTrash />
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default AdminBookings;
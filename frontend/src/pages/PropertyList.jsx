import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaTrash,
    FaArrowLeft
} from "react-icons/fa";

import api, { BASE_URL } from "../services/api";
import "../styles/PropertyList.css";

function PropertyList() {

    const [properties, setProperties] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const response = await api.get(`/properties/owner/${user.email}`);

            setProperties(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to fetch properties");

        }

    };

    const deleteProperty = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/properties/${id}`);

            alert("Property Deleted Successfully");

            fetchProperties();

        } catch (error) {

            console.log(error);

            alert("Failed to Delete Property");

        }

    };

    return (

        <div className="property-page">

            <div className="property-header">

                <h1>My Properties</h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/owner")}
                >
                    <FaArrowLeft />
                    Back
                </button>

            </div>

            {properties.length === 0 ? (

                <div className="empty-property">

                    <FaHome className="house-icon" />

                    <h2>No Properties Found</h2>

                </div>

            ) : (

                <div className="property-grid">

                    {properties.map((property) => (

                        <div
                            className="property-card"
                            key={property.id}
                        >

                            <div className="property-image">

                                {property.imageUrl ? (

                                    <img
                                        src={`${BASE_URL}/uploads/${property.imageUrl}`}
                                        alt={property.title}
                                        className="property-img"
                                    />

                                ) : (

                                    <FaHome className="house-icon" />

                                )}

                            </div>

                            <div className="card-top">

                                <h2>{property.title}</h2>

                            </div>

                            <p>
                                <FaMapMarkerAlt className="icon" />
                                {property.location}
                            </p>

                            <p>
                                <FaRupeeSign className="icon" />
                                ₹{property.rent}
                            </p>

                            <p>{property.description}</p>

                            <button
                                className="delete-btn"
                                onClick={() => deleteProperty(property.id)}
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

export default PropertyList;
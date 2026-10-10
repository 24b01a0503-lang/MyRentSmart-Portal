import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaBuilding,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaEnvelope,
    FaTrash,
    FaHome
} from "react-icons/fa";

import api, { BASE_URL } from "../services/api";
import "../styles/AdminProperties.css";

function AdminProperties() {

    const [properties, setProperties] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {

        try {

            const response = await api.get("/properties");

            setProperties(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const deleteProperty = async (id) => {

        if (!window.confirm("Delete this property?"))
            return;

        try {

            await api.delete(`/properties/${id}`);

            alert("Property Deleted Successfully");

            fetchProperties();

        } catch (error) {

            console.error(error);

            alert("Failed to Delete Property");

        }

    };

    return (

        <div className="admin-properties-page">

            <div className="property-header">

                <h1>
                    <FaBuilding /> Manage Properties
                </h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/admin")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </div>

            {properties.length === 0 ? (

                <div className="empty-property">

                    <FaBuilding className="empty-icon" />

                    <h2>No Properties Available</h2>

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

                            <h2>{property.title}</h2>

                            <p>
                                <FaMapMarkerAlt className="icon" />
                                {property.location}
                            </p>

                            <p>
                                <FaRupeeSign className="icon" />
                                ₹ {property.rent}
                            </p>

                            <p>{property.description}</p>

                            <p>
                                <FaEnvelope className="icon" />
                                {property.ownerEmail}
                            </p>

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

export default AdminProperties;
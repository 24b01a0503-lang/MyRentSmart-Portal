import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaFileAlt,
    FaPlusCircle,
    FaImage
} from "react-icons/fa";

import api from "../services/api";
import "../styles/AddProperty.css";

function AddProperty() {

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [rent, setRent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleAddProperty = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const formData = new FormData();

            formData.append("title", title);
            formData.append("location", location);
            formData.append("rent", rent);
            formData.append("description", description);
            formData.append("ownerEmail", user.email);
            formData.append("image", image);

            await api.post("/properties", formData);

            alert("Property Added Successfully");

            navigate("/properties");

        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert("Failed to Add Property");
        }

    };

    return (

        <div className="add-property-page">

            <div className="property-card">

                <h1>
                    <FaPlusCircle /> Add Property
                </h1>

                <p className="subtitle">
                    Fill in the details of your rental property.
                </p>

                <div className="input-group">
                    <FaHome className="icon"/>
                    <input
                        type="text"
                        placeholder="Property Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <FaMapMarkerAlt className="icon"/>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <FaRupeeSign className="icon"/>
                    <input
                        type="number"
                        placeholder="Monthly Rent"
                        value={rent}
                        onChange={(e)=>setRent(e.target.value)}
                    />
                </div>

                <div className="textarea-group">
                    <FaFileAlt className="icon textarea-icon"/>
                    <textarea
                        rows="5"
                        placeholder="Property Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <FaImage className="icon"/>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>

                <button
                    className="add-btn"
                    onClick={handleAddProperty}
                >
                    Add Property
                </button>

                <button
                    className="back-btn"
                    onClick={()=>navigate("/owner")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    );

}

export default AddProperty;
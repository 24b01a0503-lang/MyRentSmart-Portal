import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaHome
} from "react-icons/fa";

import api from "../services/api";
import houseImage from "../assets/house.jpg";
import "../styles/Register.css";
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("TENANT");

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {

            await api.post("/users/register", {
                name: name,
                email: email,
                phone: phone,
                password: password,
                role: role
            });

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert("Registration Failed");
            console.log(error);

        }

    };

    return (

        <div className="register-page">

            <div
                className="left-section"
                style={{ backgroundImage: `url(${houseImage})` }}
            >
            </div>

            <div className="right-section">

                <div className="register-card">

                    <h1 className="register-title">
                        <FaHome /> RentSmart
                    </h1>

                    <p className="register-subtitle">
                        Create your account
                    </p>

                    <div className="input-group">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FaEnvelope className="icon" />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FaPhone className="icon" />
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <select
                        className="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="TENANT">Tenant</option>
                        <option value="OWNER">Owner</option>
                    </select>

                    <button
                        className="register-btn"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                    <p className="login-text">

                        Already have an account?

                        <span
                            className="login-link"
                            onClick={() => navigate("/")}
                        >
                        {" "}Login Here
                    </span>

                    </p>

                </div>

            </div>

        </div>

    );
}

export default Register;
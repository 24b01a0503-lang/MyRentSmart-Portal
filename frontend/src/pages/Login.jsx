import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import api from "../services/api";
import "../styles/Login.css";
import houseImage from "../assets/house.jpg";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            const user = response.data;

            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "OWNER") {
                navigate("/owner");
            }
            else if (user.role === "TENANT") {
                navigate("/tenant");
            }
            else if (user.role === "ADMIN") {
                navigate("/admin");
            }

        }
        catch (error) {

            alert("Invalid Email or Password");
            console.log(error);

        }

    };

    return (

        <div className="login-page">

            <div
                className="left-section"
                style={{ backgroundImage: `url(${houseImage})` }}
            >
            </div>

            <div className="right-section">

                <div className="login-card">

                    <h1 className="login-title">
                        <FaHome /> RentSmart
                    </h1>

                    <p className="login-subtitle">
                        Welcome Back
                    </p>

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

                        <FaLock className="icon" />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p className="register-text">

                        New User?

                        <span
                            className="register-link"
                            onClick={() => navigate("/register")}
                        >
                        {" "}Register Here
                    </span>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;
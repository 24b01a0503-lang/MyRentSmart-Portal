import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaArrowLeft,
    FaTrash,
    FaUserCircle
} from "react-icons/fa";

import api from "../services/api";
import "../styles/AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?"))
            return;

        try {

            const response = await api.delete(`/users/${id}`);

            alert(response.data);

            if (response.data === "User deleted successfully.") {
                fetchUsers();
            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Something went wrong.");
            }

        }

    };

    return (

        <div className="admin-users-page">

            <div className="users-header">

                <h1>
                    <FaUsers /> Manage Users
                </h1>

                <button
                    className="back-btn"
                    onClick={() => navigate("/admin")}
                >
                    <FaArrowLeft />
                    Dashboard
                </button>

            </div>

            {users.length === 0 ? (

                <div className="empty-users">

                    <FaUserCircle className="empty-icon"/>

                    <h2>No Users Found</h2>

                </div>

            ) : (

                <div className="users-grid">

                    {users.map(user => (

                        <div
                            className="user-card"
                            key={user.id}
                        >

                            <FaUserCircle className="user-icon"/>

                            <h2>{user.name}</h2>

                            <p><strong>ID:</strong> {user.id}</p>

                            <p><strong>Email:</strong> {user.email}</p>

                            <p><strong>Phone:</strong> {user.phone}</p>

                            <span className="role-badge">
                                {user.role}
                            </span>

                            <button
                                className="delete-btn"
                                onClick={() => deleteUser(user.id)}
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

export default AdminUsers;
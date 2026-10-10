import { BrowserRouter, Routes, Route } from "react-router-dom";
import AvailableProperties from "./pages/AvailableProperties";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerDashboard from "./pages/OwnerDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddProperty from "./pages/AddProperty";
import PropertyList from "./pages/PropertyList";
import OwnerBookings from "./pages/OwnerBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminProperties from "./pages/AdminProperties";
import AdminBookings from "./pages/AdminBookings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/owner" element={<OwnerDashboard />} />
                <Route path="/tenant" element={<TenantDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/properties" element={<PropertyList />} />
                <Route path="/available-properties" element={<AvailableProperties />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route
                    path="/owner-bookings"
                    element={<OwnerBookings />}
                />

            <Route path="/admin/users" element={<AdminUsers />} />

            <Route path="/admin/properties" element={<AdminProperties />} />

            <Route path="/admin/bookings" element={<AdminBookings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
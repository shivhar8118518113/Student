import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: "success", message: "✅ Registration successful! Redirecting..." });
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setStatus({
                    type: "error",
                    message: "❌ " + (data.message || "Registration failed"),
                });
            }
        } catch (error) {
            setStatus({ type: "error", message: "❌ Request failed: " + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "85vh", maxWidth: "400px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h2
                className="mb-4 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Register
            </motion.h2>

            <div className="card p-3 shadow-lg border-0 w-100">
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {status.message && (
                    <div className={`alert mt-3 ${status.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                        {status.message}
                    </div>
                )}

                <div className="mt-3 text-center">
                    <small>Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login here</a></small>
                </div>
            </div>
        </motion.div>
    );
}

import React, { useState } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Password toggle state
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "✅ User created successfully!" });
        setFormData({ name: "", email: "", password: "", role: "user" });
      } else {
        setStatus({
          type: "error",
          message: "❌ " + (data.message || "Something went wrong"),
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
      className="container mt-5 animate-form"
      style={{ maxWidth: "600px" }}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.h2
        className="mb-4 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Add New User
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Name */}
        <motion.div
          className="mb-3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter full name"
            required
          />
        </motion.div>

        {/* Email */}
        <motion.div
          className="mb-3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email address"
            required
          />
        </motion.div>

        {/* Password with Eye Button */}
        <motion.div
          className="mb-3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
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
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>
        </motion.div>

        {/* Role */}
        <motion.div
          className="mb-3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <label className="form-label fw-bold">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Submitting..." : "Submit"}
        </motion.button>
      </motion.form>

      {status.message && (
        <motion.div
          className={`alert mt-3 ${
            status.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {status.message}
        </motion.div>
      )}
    </motion.div>
  );
}

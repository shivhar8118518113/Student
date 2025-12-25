import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskForm({ setItems, items, startCreate, endCreate, onCreateSuccess, onCreateError, creating }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim()) {
      setMessage("⚠️ Title and Category are required!");
      return;
    }

    try {
      startCreate();
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim(),
          description: description.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      onCreateSuccess(newTask);

      setTitle("");
      setCategory("");
      setDescription("");
      setMessage("✅ Task Added Successfully!");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Error adding task:", err);
      onCreateError();
      setMessage("❌ Failed to add task: " + err.message);
    } finally {
      endCreate();
    }
  };

  return (
    <motion.div
      className="container mt-4 animate-form"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <motion.h3
        className="mb-3 text-light bounce"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ➕ Add New Task
      </motion.h3>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className={`global-toast ${
              message.includes("⚠️") || message.includes("❌")
                ? "toast-error"
                : "toast-success"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="card p-4 shadow-soft glass">
        <div className="mb-3">
          <label className="form-label fw-bold">Title</label>
          <input
            type="text"
            className="form-control glow-blue"
            placeholder="e.g., Fix bug #102"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Category</label>
          <input
            type="text"
            className="form-control glow-pink"
            placeholder="e.g., Frontend"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <textarea
            className="form-control glow-green"
            rows="3"
            placeholder="Optional: add brief details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary w-100 lift"
          disabled={creating}
          whileTap={{ scale: 0.95 }}
        >
          {creating ? <span className="loading-bar"></span> : "➕ Add Task"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default TaskForm;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskList({ items, deleteItem, clearAll, updateItem, loading }) {
  const [message, setMessage] = useState("");

  const handleEdit = (task) => {
    const newTitle = prompt("Enter new title:", task.title);
    const newCategory = prompt("Enter new category:", task.category);
    const newDescription = prompt("Enter new description:", task.description);

    if (!newTitle || !newCategory) {
      setMessage("⚠️ Title and Category are required for update!");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    updateItem(task._id, {
      title: newTitle,
      category: newCategory,
      description: newDescription,
    });

    setMessage("✅ Task updated successfully!");
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #00c9ff, #92fe9d)", // Professional gradient background
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <motion.h3
        className="mb-3 text-dark bounce"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📋 Task List
      </motion.h3>

      {/* ✅ Feedback toast */}
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

      {/* ✅ Empty state */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="empty-state"
          style={{
            background: "linear-gradient(135deg, #ff6a00, #ee0979)",
            color: "#fff",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          <span className="emoji">✨</span>
          <p>No tasks yet. Add one above!</p>
        </motion.div>
      )}

      {/* ✅ Structured Table */}
      {items.length > 0 && (
        <motion.table
          className="table table-striped table-bordered shadow-soft animated-slide-in"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead
            className="table-dark"
            style={{
              background: "linear-gradient(90deg, #111827, #1f2937)",
              color: "#fff",
            }}
          >
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.map((task) => (
                <motion.tr
                  key={task._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="animated-list-item"
                >
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info glow me-2"
                      onClick={() => handleEdit(task)}
                      disabled={loading.update}
                    >
                      {loading.update ? "Updating…" : "✏️ Edit"}
                    </button>
                    <button
                      className="btn btn-sm btn-danger zoom-out"
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to delete this task?")
                        ) {
                          deleteItem(task._id);
                          setMessage("❌ Task deleted successfully!");
                          setTimeout(() => setMessage(""), 2500);
                        }
                      }}
                      disabled={loading.delete}
                    >
                      {loading.delete ? "Deleting…" : "❌ Delete"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      )}

      {/* ✅ Clear All button */}
      {items.length > 0 && (
        <motion.div
          className="d-flex justify-content-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className="btn btn-warning mt-3 shake"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all tasks?")) {
                clearAll();
                setMessage("🗑️ All tasks cleared successfully!");
                setTimeout(() => setMessage(""), 2500);
              }
            }}
            disabled={loading.clear}
          >
            {loading.clear ? "Clearing…" : "🗑️ Clear All"}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default TaskList;
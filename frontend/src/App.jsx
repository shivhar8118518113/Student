import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import NewProducts from "./components/NewProducts";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

export default function App() {
  // Theme
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark((prev) => !prev);

  // Data
  const [items, setItems] = useState([]);

  // UX messages (success + error)
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }
  const showMessage = (type, text) => {
    setMessage({ type, text });
    // Auto hide after 2.5s
    setTimeout(() => setMessage(null), 2500);
  };

  // Auth State
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  // Loading flags
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    clear: false,
  });

  // ✅ Fetch tasks from backend when app loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading((l) => ({ ...l, fetch: true }));
        const res = await fetch("http://localhost:5000/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setItems(data);
        showMessage("success", "Tasks loaded successfully");
      } catch (err) {
        showMessage("error", "Error fetching tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading((l) => ({ ...l, fetch: false }));
      }
    };
    fetchTasks();
  }, []);

  // ✅ Delete task by _id (backend + state) with confirm popup
  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Delete this task permanently?");
    if (!confirmDelete) return;

    try {
      setLoading((l) => ({ ...l, delete: true }));
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");

      setItems((prevItems) => prevItems.filter((it) => it._id !== id));
      showMessage("success", "Task deleted successfully");
    } catch (err) {
      showMessage("error", "Error deleting task");
      console.error("Error deleting task:", err);
    } finally {
      setLoading((l) => ({ ...l, delete: false }));
    }
  };

  // ✅ Clear all tasks (backend + state) with confirm popup
  const clearAll = async () => {
    const confirmClear = window.confirm("Clear all tasks? This cannot be undone.");
    if (!confirmClear) return;

    try {
      setLoading((l) => ({ ...l, clear: true }));
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to clear tasks");

      setItems([]);
      showMessage("success", "All tasks cleared successfully");
    } catch (err) {
      showMessage("error", "Error clearing tasks");
      console.error("Error clearing tasks:", err);
    } finally {
      setLoading((l) => ({ ...l, clear: false }));
    }
  };

  // ✅ Update task (PUT API)
  const updateItem = async (id, updatedData) => {
    try {
      setLoading((l) => ({ ...l, update: true }));
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();

      // ✅ Update state instantly (with exit/enter animation hints via key change)
      setItems((prev) => prev.map((it) => (it._id === id ? updatedTask : it)));
      showMessage("success", "Task updated successfully");
    } catch (err) {
      showMessage("error", "Error updating task");
      console.error("Error updating task:", err);
    } finally {
      setLoading((l) => ({ ...l, update: false }));
    }
  };

  // ✅ Create will be handled inside TaskForm; we pass helpers down
  const startCreate = () => setLoading((l) => ({ ...l, create: true }));
  const endCreate = () => setLoading((l) => ({ ...l, create: false }));
  const onCreateSuccess = (newTask) => {
    setItems((prev) => [newTask, ...prev]);
    showMessage("success", "Task created successfully");
  };
  const onCreateError = () => {
    showMessage("error", "Error creating task");
  };

  return (
    <BrowserRouter>
      <div
        className={`d-flex flex-column min-vh-100 ${dark ? "theme-dark" : "theme-light"
          }`}
      >
        {/* ✅ Navbar with Auth & Theme props */}
        <Navbar
          isAuthenticated={!!token}
          logout={handleLogout}
          dark={dark}
          toggleTheme={toggleTheme}
        />

        {/* ✅ Global message toast */}
        {message && (
          <div
            className={`global-toast ${message.type === "success" ? "toast-success" : "toast-error"}`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* ✅ Main content */}
        <main className="flex-grow-1">
          <Routes>
            {/* ✅ Home page with animated hero */}
            <Route
              path="/"
              element={
                <div className="home-page full-animated">
                  <div className="hero-section text-center w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="hero-title animated-fade-in">🚀 Task Manager</h2>
                    <p className="hero-subtitle animated-type">
                      Organize. Complete. Shock the World.
                    </p>
                  </div>

                  <div className="mt-4 w-100 d-flex justify-content-center gap-3">
                    {!token ? (
                      <>
                        <Link to="/login" className="btn btn-primary btn-lg px-4 shadow">Login</Link>
                        <Link to="/register" className="btn btn-outline-primary btn-lg px-4 shadow">Register</Link>
                      </>
                    ) : (
                      <Link to="/project" className="btn btn-success btn-lg px-4 shadow">Go to Project 🚀</Link>
                    )}
                  </div>
                </div>
              }
            />

            {/* About page */}
            <Route
              path="/about"
              element={
                <div className="mx-auto" style={{ maxWidth: 720 }}>
                  <h2>About</h2>
                  <p className="text-muted">
                    <i>
                      This Task Manager UI prototype combines modern React architecture with Bootstrap styling and motion
                      to deliver a refined, unique user experience.
                    </i>
                  </p>
                </div>
              }
            />

            {/* Project page (Protected) */}
            <Route
              path="/project"
              element={
                token ? (
                  <>
                    <TaskForm
                      items={items}
                      setItems={setItems}
                      // hooks for UX
                      startCreate={startCreate}
                      endCreate={endCreate}
                      onCreateSuccess={onCreateSuccess}
                      onCreateError={onCreateError}
                      creating={loading.create}
                    />
                    <TaskList
                      items={items}
                      deleteItem={deleteItem}
                      clearAll={clearAll}
                      updateItem={updateItem}
                      // pass loading flags to control buttons
                      loading={loading}
                    />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Products page (Protected) */}
            <Route
              path="/new-products"
              element={token ? <NewProducts /> : <Navigate to="/login" />}
            />

            {/* Add User page (Protected) */}
            <Route
              path="/add-user"
              element={token ? <UserForm /> : <Navigate to="/login" />}
            />

            {/* Auth pages */}
            <Route
              path="/login"
              element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/project" />}
            />
            <Route
              path="/register"
              element={!token ? <Register /> : <Navigate to="/project" />}
            />
          </Routes>
        </main>

        {/* ✅ Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

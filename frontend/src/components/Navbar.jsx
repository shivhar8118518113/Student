import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ isAuthenticated, logout, dark, toggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow custom-navbar">
      <div className="container-fluid px-3">
        {/* ✅ Brand */}
        <span className="navbar-brand fw-bold">
          Task Manager <span className="text-warning">PRASAD HARERAM</span>
        </span>

        {/* ✅ Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navbar links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                }
              >
                About
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/project"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                    }
                  >
                    Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/new-products"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/add-user"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                    }
                  >
                    Add User
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center ms-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      "nav-link btn btn-sm btn-outline-warning ms-2" + (isActive ? " active fw-bold" : "")
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Theme Toggle */}
            <li className="nav-item d-flex align-items-center ms-3">
              <button
                className="btn btn-sm btn-link text-decoration-none"
                onClick={toggleTheme}
                title="Toggle Theme"
                style={{ fontSize: '1.2rem' }}
              >
                {dark ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

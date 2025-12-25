import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer bg-dark text-white py-3 mt-auto shadow">
      <div className="container-fluid text-center px-3">
        <p className="mb-0">
          © {currentYear} <span className="fw-bold text-warning">Task Manager</span> — All rights reserved
        </p>
      </div>
    </footer>
  );
}
export default Footer;
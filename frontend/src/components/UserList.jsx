import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ Loading state
  const [error, setError] = useState(null);       // ✅ Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">Users from Backend</h2>

      {/* ✅ Loading state with spinner */}
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-info" role="status"></div>
          <p className="mt-2 text-info">Loading users...</p>
        </div>
      )}

      {/* ✅ Error state */}
      {error && (
        <div className="alert alert-danger my-3" role="alert">
          Error: {error}
        </div>
      )}

      {/* ✅ User list */}
      {!loading && !error && users.length > 0 ? (
        <ul className="list-group animated-list">
          {users.map((user) => (
            <li key={user.id} className="list-group-item fade-in">
              {user.name}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && (
          <p className="text-warning">⚠️ No users fetched yet!</p>
        )
      )}
    </div>
  );
}

export default UserList;


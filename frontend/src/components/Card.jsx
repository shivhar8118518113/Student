import React, { useState } from "react";

function Card({ item, deleteItem }) {
  const [liked, setLiked] = useState(false);
  const [done, setDone] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(1);

  const toggleLike = () => setLiked((prev) => !prev);
  const toggleDone = () => setDone((prev) => !prev);
  const toggleExpand = () => setExpanded((prev) => !prev);
  const incQty = () => setQty((prev) => prev + 1);
  const decQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div
      className={`card h-100 shadow-sm animated-card ${
        liked ? "pulse" : ""
      } ${done ? "flip" : ""}`}
    >
      <div className={`card-body ${done ? "bg-success bg-opacity-10" : ""}`}>
        <div className="mb-2 fade-in">
          {done && <span className="badge bg-success me-2">Completed</span>}
          {liked && <span className="badge bg-danger me-2">Liked</span>}
          <span className="badge bg-primary">{item.category}</span>
        </div>

        <h5 className={`card-title ${done ? "text-success bounce" : ""}`}>
          {item.title}
        </h5>

        {expanded ? (
          <p className="card-text slide-down">{item.description}</p>
        ) : (
          <p className="card-text text-muted slide-up">
            Details hidden. Click “Expand”.
          </p>
        )}

        <div className="mt-3 d-flex flex-wrap gap-2">
          <button
            className={`btn btn-sm ${
              liked ? "btn-danger shake" : "btn-outline-danger"
            }`}
            onClick={toggleLike}
          >
            {liked ? "Unlike" : "Like"}
          </button>

          <button
            className={`btn btn-sm ${
              done ? "btn-success glow" : "btn-outline-success"
            }`}
            onClick={toggleDone}
          >
            {done ? "Mark as Undone" : "Mark as Done"}
          </button>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={toggleExpand}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>

          <div className="btn-group btn-group-sm" role="group">
            <button className="btn btn-outline-secondary" onClick={decQty}>
              -
            </button>
            <button className="btn btn-light" disabled>
              {qty}
            </button>
            <button className="btn btn-outline-secondary" onClick={incQty}>
              +
            </button>
          </div>

          <button
            className="btn btn-sm btn-outline-danger ms-auto zoom-out"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
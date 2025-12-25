import React, { useEffect, useState } from "react";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("⚠️ Products fetch karte time error aaya. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="py-4 text-center">
        <div className="spinner-border text-secondary" role="status" />
        <p className="mt-2 text-muted">Loading products...</p>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="alert alert-danger my-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">New Products</h2>
        <span className="badge bg-secondary">{products.length} items</span>
      </div>

      {/* Product grid */}
      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              {/* Product image */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: 180, background: "rgba(0,0,0,0.02)" }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{
                    maxHeight: 160,
                    maxWidth: "90%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Product details */}
              <div className="card-body d-flex flex-column">
                <h6 className="card-title" title={p.title}>
                  {p.title.length > 60 ? p.title.slice(0, 60) + "…" : p.title}
                </h6>
                <p className="text-muted mb-2">{p.category}</p>

                {/* ✅ Ratings + Price + Button */}
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>₹{p.price}</strong>
                    <button className="btn btn-sm btn-outline-primary">
                      View
                    </button>
                  </div>

                  {/* ✅ Star ratings */}
                  {p.rating && (
                    <div className="text-warning small">
                      {"★".repeat(Math.round(p.rating.rate))}
                      {"☆".repeat(5 - Math.round(p.rating.rate))}
                      <span className="text-muted ms-2">
                        ({p.rating.count} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
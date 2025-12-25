import React from "react";
import Card from "./Card";   // ✅ Card component import

function Home() {
  // ✅ Dummy data array
  const cardData = [
    { title: "Task Manager", description: "Manage your daily tasks easily.", category: "Productivity" },
    { title: "Study Notes", description: "Organize notes for exams.", category: "Education" },
    { title: "Shopping List", description: "Track groceries and essentials.", category: "Personal" },
    { title: "Workout Plan", description: "Stay fit with daily routines.", category: "Health" },
    { title: "Project Ideas", description: "Brainstorm and save ideas.", category: "Creativity" },
  ];

  return (
    <>   
      {/* --- Hero Section with Gradient + Animation --- */}
      <section className="hero-section d-flex align-items-center text-center">
        <div className="container">
          <h1 className="hero-title fw-bold">🚀 Welcome to My Unique App</h1>
          <p className="hero-subtitle mt-3">
            Organize, manage and shine with style ✨
          </p>
          <div className="hero-buttons mt-4">
            <button className="btn btn-primary me-3">Login</button>
            <button className="btn btn-outline-light">Register</button>
          </div>
        </div>
      </section>

      {/* --- Cards Section --- */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center section-title">Reusable Cards</h2>
          <div className="row">
            {cardData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;


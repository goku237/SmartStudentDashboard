import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TaskManager from "../components/TaskManager";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

export default function TasksPage() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className="dashboard" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Pexels image background for Pending Tasks */}
      <img
        src="https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg?auto=compress&w=1200&q=80"
        alt="Newton's Cradle"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
          filter: dark ? "brightness(0.6) grayscale(0.1)" : "brightness(1.05) saturate(1.05)"
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: dark
            ? "linear-gradient(180deg, rgba(44,62,80,0.7), rgba(52,73,94,0.7))"
            : "linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.32))",
          zIndex: -1,
          pointerEvents: "none"
        }}
      ></div>
      <header className="header" style={{ position: "relative", zIndex: 1 }}>
        <Link to="/" className="btn secondary" style={{ marginRight: "20px", background: dark ? "#232526" : "#fff", color: dark ? "#fff" : "#222", border: "1px solid #4ecdc4", borderRadius: "8px", padding: "8px 18px", fontWeight: "bold", fontSize: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>← Back to Dashboard</Link>
        <h1 style={{ color: dark ? "#eaf6fb" : "#222", fontWeight: 700 }}>Pending Tasks</h1>
        <ThemeToggle style={{ background: dark ? "#232526" : "#fff", color: dark ? "#fff" : "#222", border: "1px solid #4ecdc4", borderRadius: "8px", padding: "8px 18px", fontWeight: "bold", fontSize: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
      </header>
      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="card" style={{
          background: dark ? "rgba(52,73,94,0.85)" : "rgba(255,255,255,0.60)",
          border: dark ? "1px solid #4ecdc4" : "1px solid #ff6b6b",
          boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
          borderRadius: "16px",
          color: dark ? "#eaf6fb" : "#222",
          padding: "32px"
        }}>
          <TaskManager />
        </div>
      </div>
    </div>
  );
}
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CalendarView from "../components/CalendarView";
import Pomodoro from "../components/Pomodoro";
import ThemeToggle from "../components/ThemeToggle";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);
  const { dark } = useContext(ThemeContext);
  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 3); // Show only first 3
  const recentCompleted = tasks.filter(t => t.completed).slice(0, 3); // Show recent completed

  const getTimeRemaining = (dueDate) => {
    if (!dueDate) return null;
    const now = new Date();
    const due = new Date(dueDate.seconds * 1000);
    const diff = due - now;
    if (diff < 0) return "Overdue";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  return (
    <div className="dashboard" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Video background for both themes */}
      <video
        autoPlay
        loop
        muted
        playsInline
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
        src="https://videos.pexels.com/video-files/3255275/3255275-uhd_3840_2160_25fps.mp4"
      ></video>
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
        <h1 style={{ color: dark ? "#eaf6fb" : "#222", fontWeight: 700, background: "none", WebkitBackgroundClip: "initial", WebkitTextFillColor: "initial", backgroundClip: "initial" }}>
          Smart Student Productivity Dashboard
        </h1>
        <ThemeToggle style={{ background: dark ? "#232526" : "#fff", color: dark ? "#fff" : "#222", border: "1px solid #4ecdc4", borderRadius: "8px", padding: "8px 18px", fontWeight: "bold", fontSize: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
      </header>
      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
          padding: "30px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
          color: dark ? "#f9fafb" : undefined
        }}
      >
        {/* Pomodoro Timer - Full Height */}
        <div
          className="card"
          style={{
            gridColumn: "span 1",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            background: dark ? "rgba(44,62,80,0.7)" : "rgba(255,255,255,0.55)",
            border: "1px solid #4ecdc4",
            boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
            borderRadius: "16px",
            color: dark ? "#f9fafb" : undefined
          }}
        >
          <Pomodoro />
        </div>
        {/* Combined Tasks & Analytics Box */}
        <div
          className="card"
          style={{
            gridColumn: "span 1",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
            background: dark ? "rgba(52,73,94,0.85)" : "rgba(255,255,255,0.60)",
            border: dark ? "1px solid #4ecdc4" : "1px solid #ff6b6b",
            boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
            borderRadius: "16px",
            color: dark ? "#f9fafb" : undefined
          }}
        >
          {/* Tasks Section */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
              <h3 style={{ margin: 0, color: dark ? "#eaf6fb" : "#374151", fontSize: "1.2rem" }}>📋 Pending Tasks</h3>
              <Link
                to="/tasks"
                style={{
                  color: dark ? "#90cdf4" : "#2563eb",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
              >
                View All →
              </Link>
            </div>

            {pendingTasks.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {pendingTasks.map(task => (
                  <div key={task.id} style={{
                    padding: "10px 12px",
                    background: "#f8fafc",
                    borderRadius: "6px",
                    borderLeft: `3px solid ${task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#10b981'}`,
                    fontSize: "0.85rem"
                  }}>
                    <div style={{ fontWeight: "500", marginBottom: "2px" }}>{task.title}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      {task.priority} {getTimeRemaining(task.dueDate) && `• ${getTimeRemaining(task.dueDate)}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: "center",
                padding: "20px",
                color: "#6b7280",
                fontSize: "0.9rem"
              }}>
                No pending tasks! 🎉
              </div>
            )}
          </div>

          {/* Analytics/Recent Activities Section */}
          <div style={{ borderTop: "1px solid rgba(229,231,235,0.8)", paddingTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ margin: 0, color: dark ? "#eaf6fb" : "#374151", fontSize: "1.2rem" }}>📊 Recent Activities</h3>
              <Link to="/analytics" style={{ color: dark ? "#90cdf4" : "#2563eb", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>
                View Analytics →
              </Link>
            </div>

            {recentCompleted.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {recentCompleted.map(task => (
                  <div key={task.id} style={{
                    padding: "10px 12px",
                    background: "#f0f9ff",
                    borderRadius: "6px",
                    borderLeft: "3px solid #10b981",
                    fontSize: "0.85rem",
                    textDecoration: "line-through",
                    opacity: 0.8
                  }}>
                    <div style={{ fontWeight: "500", marginBottom: "2px" }}>{task.title}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      {task.priority} • Completed recently
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: "center",
                padding: "20px",
                color: "#6b7280",
                fontSize: "0.9rem"
              }}>
                No recent completions yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Section - Centered and Properly Sized */}
      <div style={{
        padding: "30px 20px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 1
      }}>
        <div className="card" style={{
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto",
          background: !dark ? "rgba(255,255,255,0.78)" : undefined,
          border: !dark ? "1px solid rgba(34,197,94,0.06)" : undefined,
          boxShadow: !dark ? "0 6px 20px rgba(16,24,40,0.06)" : undefined
        }}>
          <CalendarView />
        </div>
      </div>

      {/* Quote and About Section */}
      <div style={{ position: "relative", zIndex: 1, padding: "40px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <blockquote style={{ fontSize: "1.5rem", fontStyle: "italic", color: dark ? "#eaf6fb" : "#0f172a", marginBottom: "18px" }}>
            "Small daily improvements lead to stunning results over time."
          </blockquote>
          <div style={{ fontSize: "1rem", color: dark ? "#eaf6fb" : "#374151", lineHeight: "1.6" }}>
            Smart Student Productivity Dashboard helps students organize tasks and manage focused study sessions.
            <br />It tracks progress and gives insights so you can study smarter, not harder.
          </div>
        </div>
      </div>
    </div>
  );
}

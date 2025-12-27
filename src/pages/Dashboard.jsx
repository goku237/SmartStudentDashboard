import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CalendarView from "../components/CalendarView";
import Pomodoro from "../components/Pomodoro";
import ThemeToggle from "../components/ThemeToggle";
import { TaskContext } from "../context/TaskContext";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);
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
    <div className="dashboard">
      <header className="header">
        <h1>Smart Student Productivity Dashboard</h1>
        <ThemeToggle />
      </header>

      {/* Main Content Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "25px",
        padding: "30px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        alignItems: "start"
      }}>
        {/* Pomodoro Timer - Full Height */}
        <div className="card" style={{
          gridColumn: "span 1",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column"
        }}>
          <Pomodoro />
        </div>

        {/* Combined Tasks & Analytics Box */}
        <div className="card" style={{
          gridColumn: "span 1",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px"
        }}>
          {/* Tasks Section */}
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <h3 style={{ margin: 0, color: "#374151", fontSize: "1.2rem" }}>📋 Pending Tasks</h3>
              <Link to="/tasks" style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
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
          <div style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <h3 style={{ margin: 0, color: "#374151", fontSize: "1.2rem" }}>📊 Recent Activities</h3>
              <Link to="/analytics" style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
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
        background: "rgba(255, 255, 255, 0.05)"
      }}>
        <div className="card" style={{
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto"
        }}>
          <CalendarView />
        </div>
      </div>
    </div>
  );
}

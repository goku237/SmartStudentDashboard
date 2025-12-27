import React from "react";
import { Link } from "react-router-dom";
import TaskManager from "../components/TaskManager";
import ThemeToggle from "../components/ThemeToggle";

export default function TasksPage() {
  return (
    <div className="dashboard">
      <header className="header">
        <Link to="/" className="btn secondary" style={{ marginRight: "20px" }}>← Back to Dashboard</Link>
        <h1>Task Manager</h1>
        <ThemeToggle />
      </header>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <TaskManager />
      </div>
    </div>
  );
}
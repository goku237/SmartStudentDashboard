import React from "react";
import { Link } from "react-router-dom";
import Analytics from "../components/Analytics";
import ThemeToggle from "../components/ThemeToggle";

export default function AnalyticsPage() {
  return (
    <div className="dashboard">
      <header className="header">
        <Link to="/" className="btn secondary" style={{ marginRight: "20px" }}>← Back to Dashboard</Link>
        <h1>Analytics</h1>
        <ThemeToggle />
      </header>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Analytics />
      </div>
    </div>
  );
}
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </TaskProvider>
      </ThemeProvider>
    </Router>
  );
}

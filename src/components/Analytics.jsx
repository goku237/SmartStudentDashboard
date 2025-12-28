import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Analytics({ dark }) {
  const { tasks } = useContext(TaskContext);
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const score = total ? Math.round((done / total) * 100) : 0;

  const priorityData = [
    { name: "High", value: tasks.filter(t => t.priority === "High").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "Medium").length },
    { name: "Low", value: tasks.filter(t => t.priority === "Low").length },
  ];

  const statusData = [
    { name: "Completed", value: done, color: "#10b981" },
    { name: "Pending", value: total - done, color: "#f59e0b" },
  ];

  const overdueTasks = tasks.filter(t => t.dueDate && !t.completed && new Date() > new Date(t.dueDate.seconds * 1000)).length;

  return (
    <div className="card" style={{
      background: dark ? "rgba(52,73,94,0.85)" : "rgba(255,255,255,0.60)",
      border: dark ? "1px solid #4ecdc4" : "1px solid #ff6b6b",
      boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
      borderRadius: "16px",
      color: dark ? "#eaf6fb" : "#222"
    }}>
      <h2 style={{ color: dark ? "#eaf6fb" : "#222" }}>Analytics</h2>
      <p className="score" style={{ color: dark ? "#90cdf4" : "#222", fontWeight: "bold", fontSize: "2rem" }}>{score}%</p>
      <p>{done} of {total} tasks completed</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: dark ? "#eaf6fb" : "#222" }}>Task Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ color: dark ? "#eaf6fb" : "#222" }}>Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Overdue Tasks:</strong> {overdueTasks}</p>
      </div>
    </div>
  );
}

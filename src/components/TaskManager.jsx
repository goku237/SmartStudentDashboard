import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { auth } from "../services/firebase";

export default function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title.trim() || !auth.currentUser) return;

    setLoading(true);
    try {
      await addTask(title, priority, dueDate);
      setTitle("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await toggleTask(id, completed);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTimeRemaining = (dueDate) => {
    if (!dueDate) return null;
    const now = new Date();
    const due = new Date(dueDate.seconds * 1000);
    const diff = due - now;
    if (diff < 0) return "Overdue";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  if (!auth.currentUser) {
    return (
      <div className="card">
        <h2>Task Manager</h2>
        <p>Please wait while we authenticate you...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Task Manager</h2>

      <div className="task-input">
        <input
          placeholder="Task name..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          disabled={loading}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={loading}
        />
        <button className="btn" onClick={submit} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <h3>Pending Tasks ({pendingTasks.length})</h3>
      {pendingTasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
          No pending tasks. Add one above!
        </p>
      ) : (
        <ul className="task-list">
          {pendingTasks.map(t => (
            <li key={t.id} className={`task-item ${t.dueDate && new Date() > new Date(t.dueDate.seconds * 1000) ? 'overdue' : ''}`}>
              <div className="task-info">
                <div className="task-title">{t.title}</div>
                <div className="task-meta">
                  Priority: {t.priority} | {getTimeRemaining(t.dueDate)}
                </div>
              </div>
              <div className="task-actions">
                <button className="btn secondary" onClick={() => handleToggle(t.id, t.completed)}>Complete</button>
                <button className="btn danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3>Completed Tasks ({completedTasks.length})</h3>
      {completedTasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
          No completed tasks yet.
        </p>
      ) : (
        <ul className="task-list">
          {completedTasks.map(t => (
            <li key={t.id} className="task-item completed">
              <div className="task-info">
                <div className="task-title">{t.title}</div>
                <div className="task-meta">Priority: {t.priority}</div>
              </div>
              <div className="task-actions">
                <button className="btn secondary" onClick={() => handleToggle(t.id, t.completed)}>Undo</button>
                <button className="btn danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

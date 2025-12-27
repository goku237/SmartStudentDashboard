import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  const { tasks } = useContext(TaskContext);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayTasks = tasks.filter(t => {
        if (!t.dueDate) return false;
        const taskDate = new Date(t.dueDate.seconds * 1000);
        return taskDate.toDateString() === date.toDateString();
      });
      return dayTasks.length > 0 ? <div className="calendar-dot">{dayTasks.length}</div> : null;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasTasks = tasks.some(t => {
        if (!t.dueDate) return false;
        const taskDate = new Date(t.dueDate.seconds * 1000);
        return taskDate.toDateString() === date.toDateString();
      });
      return hasTasks ? "has-tasks" : null;
    }
  };

  return (
    <div>
      <h2>Calendar</h2>
      <Calendar
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
      <style jsx>{`
        .calendar-dot {
          background: #667eea;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          margin: 2px auto 0;
        }
        .has-tasks {
          background: rgba(102, 126, 234, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

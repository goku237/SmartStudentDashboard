import React, { useEffect, useState } from "react";

export default function Pomodoro() {
  const WORK_TIME = 25 * 60; // 25 minutes
  const SHORT_BREAK = 5 * 60; // 5 minutes
  const LONG_BREAK = 15 * 60; // 15 minutes
  const SESSIONS_BEFORE_LONG_BREAK = 4;

  const [time, setTime] = useState(WORK_TIME);
  const [run, setRun] = useState(false);
  const [sessionType, setSessionType] = useState("work"); // "work", "shortBreak", "longBreak"
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    if (!run) return;

    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          // Session completed
          handleSessionComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [run, sessionType]);

  const handleSessionComplete = () => {
    setRun(false);

    if (sessionType === "work") {
      setCompletedSessions(prev => prev + 1);
      const newSessionCount = sessionCount + 1;

      if (newSessionCount % SESSIONS_BEFORE_LONG_BREAK === 0) {
        // Long break after 4 work sessions
        setSessionType("longBreak");
        setTime(LONG_BREAK);
        setSessionCount(0);
      } else {
        // Short break
        setSessionType("shortBreak");
        setTime(SHORT_BREAK);
        setSessionCount(newSessionCount);
      }
    } else {
      // Break completed, start work session
      setSessionType("work");
      setTime(WORK_TIME);
    }
  };

  const startSession = () => {
    if (time === 0) {
      // Reset to appropriate time based on session type
      if (sessionType === "work") setTime(WORK_TIME);
      else if (sessionType === "shortBreak") setTime(SHORT_BREAK);
      else setTime(LONG_BREAK);
    }
    setRun(true);
  };

  const pauseSession = () => {
    setRun(false);
  };

  const resetSession = () => {
    setRun(false);
    if (sessionType === "work") setTime(WORK_TIME);
    else if (sessionType === "shortBreak") setTime(SHORT_BREAK);
    else setTime(LONG_BREAK);
  };

  const skipBreak = () => {
    if (sessionType !== "work") {
      setSessionType("work");
      setTime(WORK_TIME);
      setRun(false);
    }
  };

  const getSessionTypeColor = () => {
    switch (sessionType) {
      case "work": return "#4f46e5";
      case "shortBreak": return "#10b981";
      case "longBreak": return "#f59e0b";
      default: return "#4f46e5";
    }
  };

  const getNextBreakInfo = () => {
    if (sessionType !== "work") return null;

    const remainingSessions = SESSIONS_BEFORE_LONG_BREAK - (sessionCount % SESSIONS_BEFORE_LONG_BREAK);
    if (remainingSessions === 1) {
      return `Next: Long Break (15 min)`;
    } else {
      return `Next: Short Break (5 min) in ${remainingSessions - 1} session${remainingSessions - 1 > 1 ? 's' : ''}`;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>

      {/* Next Break Notification */}
      {sessionType === "work" && (
        <div style={{
          background: "linear-gradient(45deg, #10b981, #34d399)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          🎯 {getNextBreakInfo()}
        </div>
      )}

      {/* Session Type Indicator */}
      <div style={{
        textAlign: "center",
        marginBottom: "20px",
        padding: "10px",
        background: getSessionTypeColor(),
        color: "white",
        borderRadius: "8px",
        fontWeight: "500"
      }}>
        {sessionType === "work" && ""}
        {sessionType === "shortBreak" && "☕ Short Break"}
        {sessionType === "longBreak" && "🏖️ Long Break"}
      </div>

      {/* Timer Display */}
      <div className="timer" style={{
        fontSize: "48px",
        fontWeight: "700",
        color: getSessionTypeColor(),
        textAlign: "center",
        margin: "20px 0"
      }}>
        {formatTime(time)}
      </div>

      {/* Progress Bar */}
      <div style={{
        width: "100%",
        height: "8px",
        background: "#e5e7eb",
        borderRadius: "4px",
        marginBottom: "20px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${((sessionType === "work" ? WORK_TIME : sessionType === "shortBreak" ? SHORT_BREAK : LONG_BREAK) - time) / (sessionType === "work" ? WORK_TIME : sessionType === "shortBreak" ? SHORT_BREAK : LONG_BREAK) * 100}%`,
          height: "100%",
          background: getSessionTypeColor(),
          transition: "width 1s linear"
        }} />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        {!run ? (
          <button className="btn" onClick={startSession} style={{ flex: 1, minWidth: "100px" }}>
            {time === 0 ? "Start Next" : "Start"}
          </button>
        ) : (
          <button className="btn secondary" onClick={pauseSession} style={{ flex: 1, minWidth: "100px" }}>
            Pause
          </button>
        )}

        <button className="btn" onClick={resetSession} style={{ background: "#6b7280" }}>
          Reset
        </button>

        {sessionType !== "work" && (
          <button className="btn" onClick={skipBreak} style={{ background: "#f59e0b" }}>
            Skip Break
          </button>
        )}
      </div>

      {/* Session Stats */}
      <div style={{
        marginTop: "20px",
        padding: "15px",
        background: "#f8fafc",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px" }}>
          Session {sessionCount + 1} of {SESSIONS_BEFORE_LONG_BREAK}
        </div>
        <div style={{ color: "#6b7280", fontSize: "14px" }}>
          Completed: {completedSessions} sessions
        </div>
      </div>
    </div>
  );
}

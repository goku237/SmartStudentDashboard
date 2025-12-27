import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button className="btn" onClick={() => setDark(!dark)}>
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

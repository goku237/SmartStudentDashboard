import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle({ style }) {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button className="btn" style={style} onClick={() => setDark(!dark)}>
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

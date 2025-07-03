import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import FloatingAlert from "./FloatingAlert";

export default function ThemeToggle() {
  const [alert, setAlert] = useState(false);

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          setAlert(true); // ✅ TRIGGER ALERT
        }}
        aria-label="Toggle dark mode"
        aria-pressed={theme === "dark"}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
        <span
          className={`${
            theme === "dark" ? "translate-x-8" : "translate-x-1"
          } inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-300`}>
          {theme === "dark" ? (
            <MoonIcon className="w-4 h-4 text-yellow-300 mx-auto mt-[3px]" />
          ) : (
            <SunIcon className="w-4 h-4 text-yellow-500 mx-auto mt-[3px]" />
          )}
        </span>
      </button>

      <FloatingAlert
        show={alert}
        onClose={() => setAlert(false)}
        text={`Switched to ${theme === "dark" ? "🌙 Dark" : "🌞 Light"} Mode`}
      />
    </>
  );
}

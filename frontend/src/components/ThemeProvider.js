"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create a theme context
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
});

// Theme provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const updateTheme = (newTheme) => {
    // Always force light theme for this version
    const forcedTheme = "light";

    // Update state
    setTheme(forcedTheme);

    // Update localStorage
    localStorage.setItem("theme", forcedTheme);

    // Update document class - remove dark class to ensure light theme
    document.documentElement.classList.remove("dark");
  };

  // Initialize theme on mount
  useEffect(() => {
    // Clear any conflicting classes first
    document.documentElement.classList.remove("dark");

    // Force light theme
    updateTheme("light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

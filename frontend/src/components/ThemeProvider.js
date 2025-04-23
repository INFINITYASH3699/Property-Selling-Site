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
    // Update state
    setTheme(newTheme);
    
    // Update localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update document class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Clear any conflicting classes first
    document.documentElement.classList.remove("dark");
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      updateTheme(savedTheme);
    } else {
      // Default to light theme and save it
      updateTheme("light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);
"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface themeProviderType {
  mode: string;
  setMode: (mode: string) => void;
}

const themeContext = createContext<themeProviderType | undefined>(undefined);
function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState("");
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
  }, [mode]);
  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeProvider;

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a Themeprovider!");
  }
  return context;
}

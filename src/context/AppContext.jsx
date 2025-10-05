import { createContext, useContext, useEffect } from "react";
import { lightTheme, darkTheme } from "../utils/theme";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", () => {
    // detects system theme preference if LocalStorage is empty
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const themeObj = theme === "light" ? lightTheme : darkTheme;
    // applies CSS variables to :root
    Object.entries(themeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // without destructuring
    // Object.entries(themeObj).forEach((property) => {
    //   const key = property[0];
    //   const value = property[1];
    //   document.documentElement.style.setProperty(key, value);
    // });

    // runs the code whenever theme changes
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook to consume context
export const useAppContext = () => {
  return useContext(AppContext);
};

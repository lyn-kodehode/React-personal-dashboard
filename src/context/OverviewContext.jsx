import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OverviewContext = createContext();

export const useOverviewContext = () => {
  const context = useContext(OverviewContext);
  if (!context) {
    throw new Error(
      "useOverviewContext must be used within an OverviewProvider"
    );
  }

  return context;
};

export const OverviewProvider = ({ children }) => {
  const [favoriteBooks] = useLocalStorage("favoriteBooks", []);
  const [savedArticles] = useLocalStorage("savedNewsArticles", []);
  const [savedTasks] = useLocalStorage("savedTasks", []);
  const [savedCities] = useLocalStorage("savedCities", []);

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (
  //       event.key === "favoriteBooks" ||
  //       event.key === "savedNewsArticles" ||
  //       event.key === "savedTasks" ||
  //       event.key === "savedCities"
  //     ) {
  //       setRefreshTrigger((prev) => prev + 1);
  //     }
  //   };

  //   // listens to storage events (updates from other pages/routes)
  //   window.addEventListener("storage", handleStorageChange);

  //   // custom event for same-window/page storage update (between dashboard widget)
  //   window.addEventListener("localStorageUpdate", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     window.removeEventListener("loca;lStorageUpdate", handleStorageChange);
  //   };
  // }, []);

  const overviewStats = {
    books: {
      total: favoriteBooks.length,
    },
    news: {
      total: savedArticles.length,
    },
    todos: {
      total: savedTasks.length,
      completed: savedTasks.filter((savedTask) => savedTask.completed).length,
      incomplete: savedTasks.filter((savedTask) => !savedTask.completed).length,
    },
    weather: {
      cities: savedCities.length,
    },
  };

  return (
    <OverviewContext.Provider value={{ overviewStats }}>
      {children}
    </OverviewContext.Provider>
  );
};

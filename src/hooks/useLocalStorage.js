import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedItem = window.localStorage.getItem(key);

      // if savedItem exists and is not 'undefined', parse else use initialValue
      if (savedItem && savedItem !== "undefined") {
        return JSON.parse(savedItem);
      }

      // If initialValue is a function, call it. Otherwise use the value
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (error) {
      console.error("Error reading LocalStorage key", key, error);
      // return initialValue;

      // If initialValue is a function, call it. Otherwise use the value

      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  // Listens for changes to THIS specific key from other components
  useEffect(() => {
    const handleStorageUpdate = (event) => {
      const changedKey = event.key || event.detail?.key;

      // Only updates if THIS specific key changed
      if (changedKey === key) {
        try {
          const newValue = window.localStorage.getItem(key);
          if (newValue !== null && newValue !== undefined) {
            const parsed = JSON.parse(newValue);

            // Only update if value actually changes
            // convert to strings before comparison
            const currentValue = JSON.stringify(storedValue);
            const newValueString = JSON.stringify(parsed);

            // only updates if string values are different
            if (currentValue !== newValueString) {
              setStoredValue(parsed);
            }
          } else if (newValue === null) {
            // Key was removed from localStorage
            setStoredValue(
              typeof initialValue === "function" ? initialValue() : initialValue
            );
          }
        } catch (error) {
          console.error("Error syncing localStorage", error);
        }
      }
    };

    //   // listens to storage events (updates from other pages/routes)
    window.addEventListener("storage", handleStorageUpdate);

    //   // custom event for same-window/page storage update (between dashboard widget)
    window.addEventListener("localStorageUpdate", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("localStorageUpdate", handleStorageUpdate);
    };
  }, [key, initialValue]);

  // updates LocalStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));

      // Dispatch custom event to notify other components inthe same window
      window.dispatchEvent(
        new CustomEvent("localStorageUpdate", {
          detail: { key, value: storedValue },
        })
      );
    } catch (error) {
      console.error("Error setting LocalStorage key", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

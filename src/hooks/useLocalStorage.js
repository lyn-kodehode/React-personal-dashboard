import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedItem = window.localStorage.getItem(key);

      // if savedItem exists, parse else use initialValue
      // return savedItem ? JSON.parse(savedItem) : initialValue;

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

  // updates LocalStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting LocalStorage key", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

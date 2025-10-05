import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedItem = window.localStorage.getItem(key);

      // if savedItem exists, parse else use initialValue
      return savedItem ? JSON.parse(savedItem) : initialValue;
    } catch (error) {
      console.error("Error reading LocalStorage key", key, error);
      return initialValue;
    }
  });

  // Add this log to see what's changing:
  // console.log(`useLocalStorage ${key} changed:`, storedValue);

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

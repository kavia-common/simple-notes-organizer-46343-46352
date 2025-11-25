import { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useLocalStorage: Minimal reusable localStorage sync for stateful value.
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });
  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* handle error */ }
  };
  return [storedValue, setValue];
}

import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 300, callback) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      callback();
      console.log('debounce')
    }, delay);

    return () => clearTimeout(timer); // Cleanup on unmount or value change
  }, [value, delay]);

  return debouncedValue;
}

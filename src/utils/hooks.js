import { useEffect } from "react";

// handles argument function on click outside
export const useOnClickOutside = (ref, handler = () => null) => {
  useEffect(() => {
    const listener = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

import { useEffect, useState, useRef } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isResizing = useRef(false);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const result = matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      if (!isResizing.current) {
        setIsLoading(true);
        isResizing.current = true;
      }

      setValue(event.matches);

      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      resizeTimeout.current = setTimeout(() => {
        setIsLoading(false);
        isResizing.current = false;
      }, 200); // Timeout duration can be adjusted as needed
    };

    result.addEventListener("change", onChange);

    // Set the initial value and loading state
    setValue(result.matches);
    setIsLoading(false);

    return () => {
      result.removeEventListener("change", onChange);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [query]);

  return { value, isLoading };
}

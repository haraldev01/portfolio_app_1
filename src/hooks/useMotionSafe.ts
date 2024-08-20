"use client";
import { useState, useEffect } from "react";

const useMotionSafe = () => {
  // Initialize the state based on the current media query value
  const [motionSafe, setMotionSafe] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    // Create a media query list
    const mediaQueryList = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    // Define a change handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMotionSafe(!event.matches);
    };

    // Add the change handler to the media query list
    mediaQueryList.addEventListener("change", handleChange);

    // Clean up the event listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return motionSafe;
};

export default useMotionSafe;

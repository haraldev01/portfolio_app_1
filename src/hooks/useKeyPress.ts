import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export function useKeyPress(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  keyPressSettings: {
    ctrlKeyDown?: boolean;
    altKeyDown?: boolean;
    shiftKeyDown?: boolean;
  } = {
    ctrlKeyDown: false,
    altKeyDown: false,
    shiftKeyDown: false,
  },
) {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return; // Skip if the target is an input, textarea, or content-editable element
      }

      // check if one of the key is part of the ones we want
      if (!keys.some((key) => event.key === key)) return;

      // cancel if ctrl, alt, or shift-keys are necessary and NOT pressed
      if (keyPressSettings.ctrlKeyDown && !event.ctrlKey && !event.metaKey)
        return;
      if (keyPressSettings.altKeyDown && !event.altKey) return;
      if (keyPressSettings.shiftKeyDown && !event.shiftKey) return;

      callbackRef.current(event);
    },
    [
      keys,
      keyPressSettings.altKeyDown,
      keyPressSettings.ctrlKeyDown,
      keyPressSettings.shiftKeyDown,
    ],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
}

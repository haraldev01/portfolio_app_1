// utils/debounce.ts

type DebounceFunction = (...args: any[]) => void;

function debounce<T extends DebounceFunction>(
  func: T,
  wait: number,
  immediate = false,
): T {
  let timeoutId: NodeJS.Timeout | null;

  return function (this: any, ...args: Parameters<T>): void {
    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait);

    if (callNow) {
      func.apply(this, args);
    }
  } as T;
}

export default debounce;

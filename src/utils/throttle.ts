/**
 *
 * @param fn function to be throttled
 * @param wait wait time in ms between each call. 16ms for 60fps.
 * @returns
 */
export default function throttle(fn: (...args: any[]) => void, wait: number) {
  let time = Date.now();
  return function (...args: any[]) {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
}

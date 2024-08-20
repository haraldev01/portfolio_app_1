export function formatTimeForPlayer(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString();
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return h === "0" ? `${m}:${s}` : `${h}:${m}:${s}`;
}

import { formatDuration, intervalToDuration } from "date-fns";

export function formatAudioDuration(seconds: number): string {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const formattedDuration = formatDuration(duration, { delimiter: " " });

  // Customize the format to shorten it
  let result = formattedDuration
    .replace(" hours", "hr")
    .replace(" hour", "hr")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" seconds", "s")
    .replace(" second", "s");

  // If there are hours and minutes, remove seconds
  if (result.includes("hr") && result.includes("m")) {
    result = result.replace(/ \d+s/, "");
  }

  // If there are only minutes and seconds, remove seconds if they are zero
  if (!result.includes("hr") && result.includes("m")) {
    result = result.replace(/ 0s/, "");
  }

  return result;
}

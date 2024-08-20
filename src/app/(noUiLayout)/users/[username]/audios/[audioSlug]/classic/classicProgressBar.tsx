"use client";

import useAudioSelector from "@/hooks/useAudioSelector";
import { formatTimeForPlayer } from "@/utils/timeUtils";

export default function ClassicProgressBar({ audioId }: { audioId: string }) {
  const { currentTime, audioLength, currentAudioId } = useAudioSelector(
    ({ currentTime, audioLength, audioId }) => ({
      currentAudioId: audioId,
      currentTime,
      audioLength,
    }),
  );
  const isPlaying = currentAudioId == audioId;

  return (
    // currently shows audio length of currently playing audio and not of the one the page represents.
    // this is just the progress bar, so this is fine.
    // the actual numbers should be displayed by another component
    // total length should be in server component, while current time should be in client.
    <div className="h-16 w-full flex items-center justify-between text-4xl font-medium">
      <div>{isPlaying ? formatTimeForPlayer(currentTime) : "00:00"} </div>
      <div>{formatTimeForPlayer(audioLength)}</div>
    </div>
  );
}

export function ClassicProgressBarLoading() {
  return (
    <div className="h-16 w-full flex items-center justify-between text-4xl font-medium text-transparent">
      <div className="bg-gray-300 rounded-lg">00:00</div>
      <div className="bg-gray-300 rounded-lg">00:00</div>
    </div>
  );
}

"use client";
import usePlayButton from "@/hooks/usePlayButton";

export default function ClassicPlayButton({ audioId }: { audioId: string }) {
  const { isCurrentAudioAndPlaying, onClick } = usePlayButton(audioId);
  return (
    <button
      onClick={onClick}
      className="w-full h-52 rounded-lg ring-2 ring-accent text-7xl font-medium"
    >
      {isCurrentAudioAndPlaying ? "PAUSE" : "PLAY"}
    </button>
  );
}

export function ClassicPlayButtonLoading() {
  return (
    <button className="w-full h-52 rounded-lg ring-2 ring-accent text-7xl font-medium">
      <div className="rounded-lg bg-card text-transparent inline-block">
        LOADIN
      </div>
    </button>
  );
}

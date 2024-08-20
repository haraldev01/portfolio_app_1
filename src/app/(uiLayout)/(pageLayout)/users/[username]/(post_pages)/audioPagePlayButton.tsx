"use client";

import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "lucide-react";
import usePlayButton from "@/hooks/usePlayButton";
import { AudioPost } from "@/types/post";

export default function AudioPagePlayButton({
  audioId,
  audioPost,
  className,
}: {
  audioId: string;
  audioPost?: AudioPost;
  className?: string;
}) {
  const { isCurrentAudioAndPlaying, onClick } = usePlayButton(
    audioId,
    audioPost,
  );

  return (
    <button
      className={cn(
        "w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:shadow-lg transition-shadow duration-300 border-none focus:outline-none active:scale-95",
        className,
      )}
      // What even constitutes an audio? (username + audioName)/id ??? needs to be decided.
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onClick();
      }}
      aria-label={isCurrentAudioAndPlaying ? "pause" : "play"}
    >
      {isCurrentAudioAndPlaying ? (
        <PauseIcon
          fill="hsl(var(--primary-foreground))"
          stroke="hsl(var(--primary-foreground))"
          className="w-12 h-12"
        />
      ) : (
        <PlayIcon
          fill="hsl(var(--primary-foreground))"
          stroke="hsl(var(--primary-foreground))"
          className="w-12 h-12"
        />
      )}
    </button>
  );
}

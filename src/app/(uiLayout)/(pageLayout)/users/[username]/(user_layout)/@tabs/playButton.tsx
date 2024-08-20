"use client";

import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "lucide-react";
import usePlayButton from "@/hooks/usePlayButton";
import { AudioPost } from "@/types/post";

export default function PlayButton({
  audioId,
  audioPost,
  className,
}: {
  audioId: string;
  audioPost?: AudioPost;
  className?: string;
}) {
  const { isCurrentAudio, isCurrentAudioAndPlaying, onClick } = usePlayButton(
    audioId,
    audioPost,
  );

  return (
    <button
      className={cn(
        "absolute hidden md:block bottom-2 right-2 w-8 h-8 p-1 rounded-full bg-primary shadow-md border-none transition-all focus:outline-none active:brightness-75 active:scale-95",
        !isCurrentAudio &&
          "translate-y-4 group-hover:translate-y-0 ease-out duration-200 opacity-0 group-hover:opacity-100",
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
          className="w-8 h-8 md:w-6 md:h-6"
        />
      ) : (
        <PlayIcon
          fill="hsl(var(--primary-foreground))"
          stroke="hsl(var(--primary-foreground))"
          className="w-8 h-8 md:w-6 md:h-6"
        />
      )}
    </button>
  );
}

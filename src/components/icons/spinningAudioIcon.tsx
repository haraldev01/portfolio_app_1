"use client";

import AudioSvg from "@/../../public/audio.svg";
import { cn } from "@/lib/utils";
import { iconClassNameBase, iconClassNameBaseSvg } from "./config";
import useAudioSelector from "@/hooks/useAudioSelector";

export default function SpinningAudioIcon({
  className,
  audioId,
}: {
  className?: string;
  audioId: string;
}) {
  const { currentAudioId, isPlaying } = useAudioSelector(
    ({ audioId, isPlaying }) => ({ currentAudioId: audioId, isPlaying }),
  );
  const isCurrentAudioAndIsPlaying = currentAudioId === audioId && isPlaying;

  return (
    <AudioSvg
      className={cn(
        iconClassNameBase,
        iconClassNameBaseSvg,
        "animate-spin-slow",
        !isCurrentAudioAndIsPlaying && "pause",
        className,
      )}
    />
  );
}

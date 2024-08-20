"use client";

import { useMemo } from "react";
import { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import ImageWithFallback from "../imageWithFallback";
import SpinningAudioIcon from "./spinningAudioIcon";
import { iconClassNameBase } from "./config";

interface AudioIconProps extends Omit<ImageProps, "onError" | "src" | "alt"> {
  audioId: string;
  username: string | undefined;
}

export default function AudioIcon({
  audioId,
  username,
  className,
  ...props
}: AudioIconProps) {
  // when this is removed, also make this NOT a client component.
  // (remove "use client" directive on top of file.)

  const albumCoverSrc = useMemo(() => {
    return Math.random() > 0.67 ? "/Se_Det.png" : "/doesnotexist.png";
  }, [audioId]);

  const userImageSrc = useMemo(() => {
    return Math.random() > 0.5 ? "/profile_photo.jpeg" : "/doesnotexist.png";
  }, [username]);

  return (
    <ImageWithFallback
      src={albumCoverSrc}
      className={cn(iconClassNameBase, className, "object-contain")}
      alt="Audio Icon"
      height={props.width}
      width={props.width}
      {...props}
    >
      <ImageWithFallback
        src={userImageSrc}
        className={cn(iconClassNameBase, className, "object-contain")}
        alt="User Icon"
        height={props.width}
        width={props.width}
        {...props}
      >
        <SpinningAudioIcon audioId={audioId} />
      </ImageWithFallback>
    </ImageWithFallback>
  );
}

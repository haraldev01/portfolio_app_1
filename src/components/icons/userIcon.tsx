"use client";

import { useEffect, useMemo, useState } from "react";
import { ImageProps } from "next/image";
import UserSvg from "@/../../public/profile.svg";
import { cn } from "@/lib/utils";
import ImageWithFallback from "../imageWithFallback";

interface UserIconProps extends Omit<ImageProps, "onError" | "src" | "alt"> {
  username: string;
  iconClassName?: string;
  classNameBase?: string;
  width: number;
}

export default function UserIcon({
  className,
  iconClassName = "text-muted-foreground opacity-50",
  classNameBase = "w-full h-full rounded-md",
  username,
  width,
  ...props
}: UserIconProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [username]);

  const imgSrc = useMemo(() => {
    return Math.random() > 0.5 ? "/profile_photo.jpg" : "/doesnotexist.png";
  }, [username]);

  return (
    <ImageWithFallback
      src={imgSrc}
      className={cn(classNameBase, className, "object-contain")}
      alt="User Icon"
      height={width}
      width={width}
      {...props}
    >
      <div className={`w-[${width}px] h-[${width}px] p-2`}>
        <UserSvg
          className={cn(classNameBase, className)}
          aria-label="user icon"
        />
      </div>
    </ImageWithFallback>
  );
}

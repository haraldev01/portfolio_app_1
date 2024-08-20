"use client";

import { HeartIcon } from "lucide-react";
import { useState } from "react";
import setIsLikedAction from "@/actions/setIsLiked";

export default function LikeButton({
  postId,
  isLiked: initIsLiked,
}: {
  isLiked: boolean;
  postId: string;
}) {
  const [isLiked, setIsLiked] = useState(initIsLiked);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLikedAction({ postId, isLiked: !isLiked });
        setIsLiked(!isLiked);
      }}
      aria-label={isLiked ? "unlike" : "like"}
      className="before:absolute before:-inset-2"
    >
      <HeartIcon
        fill={isLiked ? "hsl(var(--primary))" : "none"}
        stroke={
          isLiked ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
        }
        className={`w-6 h-6 relative group-active/likeButton:scale-90 transition-transform ${isLiked ? "ease-[cubic-bezier(0,5,0.5,1)] duration-300 group-active/likeButton:duration-0" : "ease-out duration-0"}`}
      />
    </button>
  );
}

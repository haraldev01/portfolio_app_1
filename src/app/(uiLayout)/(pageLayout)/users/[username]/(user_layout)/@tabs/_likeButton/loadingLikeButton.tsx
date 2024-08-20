import { HeartIcon } from "lucide-react";

export function LoadingLikeButton() {
  return (
    <HeartIcon
      fill="hsl(var(--muted-foreground))"
      stroke="hsl(var(--muted-foreground))"
      className="w-6 h-6 animate-pulse"
    />
  );
}

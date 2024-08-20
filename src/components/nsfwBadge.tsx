import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function NSFWBadge({
  nsfw,
  className,
}: {
  nsfw: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant={"warning"}
      className={cn(
        nsfw
          ? "border-destructive text-destructive"
          : "border-green-500 text-green-500",
        className,
      )}
    >
      {nsfw ? "NSFW" : "SFW"}
    </Badge>
  );
}

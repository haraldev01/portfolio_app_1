import { Badge } from "./ui/badge";
import { SparklesIcon } from "lucide-react";

export default function AIBadge({ className }: { className?: string }) {
  return (
    <Badge variant={"secondary"} className={className}>
      <span>AI&nbsp;</span>
      <SparklesIcon className="w-3 h-3" />
    </Badge>
  );
}

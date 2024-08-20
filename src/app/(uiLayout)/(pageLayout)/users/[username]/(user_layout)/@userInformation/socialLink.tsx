import { cn } from "@/lib/utils";
import { SocialIcon } from "react-social-icons";

export default function SocialLink({
  text,
  url,
  className,
}: {
  text: string;
  url: string;
  className?: string;
}) {
  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  return (
    <a
      className={cn(
        "h-10 rounded-full bg-card shadow-inner overflow-hidden border border-border box-content flex items-center group md:relative",
        className,
      )}
      href={formattedUrl}
      target="_blank"
    >
      <div className="hidden md:block absolute left-0 inset-y-0 w-10 rounded-full bg-primary transition-transform duration-200 ease-out md:group-hover:scale-125" />
      <SocialIcon
        url={formattedUrl}
        as="div"
        className="flex-none"
        style={{ height: "40px", width: "40px" }}
        bgColor="hsl(var(--primary))"
        fgColor="hsl(var(--primary-foreground))"
      />
      <div className="mx-4 flex-none">{text}</div>
    </a>
  );
}

export function LoadingSocialLink({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-10 rounded-full bg-secondary border border-accent animate-pulse border border-accent box-content flex items-center flex-nowrap gap-2",
        className,
      )}
    >
      <div className="w-10 h-10 rounded-full bg-muted-foreground/50" />
      <div className="h-4 w-24 rounded-md bg-muted-foreground/50 mr-4" />
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import {
  AudioWaveformIcon,
  NotebookPenIcon,
  RssIcon,
  StickyNoteIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function PageTabLink(props: {
  href: string;
  className?: string;
  "data-active"?: boolean;
  "data-index"?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      {...props}
      className={cn(
        "h-full flex items-center justify-center flex-none data-[active=true]:flex-auto sm:data-[active=true]:flex-none min-w-10 data-[active=false]:w-[12%] sm:data-[active=false]:w-auto gap-2 rounded-t-md sm:px-4 bg-card data-[active=true]:bg-secondary data-[active=true]:text-primary ring-1 ring-border data-[active=true]:ring-accent font-medium md:hover:text-primary",
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
}

export default function UserPageTabs({
  username,
  className,
}: {
  username: string;
  className?: string;
}) {
  const currentPath = usePathname();

  const links = [
    { text: "all posts", href: `/users/${username}`, icon: RssIcon },
    {
      text: "audios",
      href: `/users/${username}/audios`,
      icon: AudioWaveformIcon,
    },
    {
      text: "scripts",
      href: `/users/${username}/scripts`,
      icon: NotebookPenIcon,
    },
    { text: "notes", href: `/users/${username}/notes`, icon: StickyNoteIcon },
  ];

  return (
    <nav
      className={cn(
        // removed md:justify-start here to stop stuff from colliding with side of screen.
        "w-full flex gap-4 px-2 h-8 border-b border-border justify-center",
        className,
      )}
      id="userPageTabs"
    >
      {links.map((link, index) => (
        <PageTabLink
          key={link.href}
          {...link}
          data-index={index}
          data-active={currentPath === link.href}
          aria-label={link.text}
        >
          {link.icon && <link.icon className="w-5 h-5" aria-hidden />}
          <span
            className={cn("sm:inline", currentPath !== link.href && "hidden")}
            aria-hidden
          >
            {link.text}
          </span>
        </PageTabLink>
      ))}
    </nav>
  );
}

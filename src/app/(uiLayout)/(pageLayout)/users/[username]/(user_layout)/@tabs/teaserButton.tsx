"use client";
import { AudioPost } from "@/types/post";
import useAudioDispatch from "@/hooks/useAudioDispatch";
import useAudioSelector from "@/hooks/useAudioSelector";
import { cn } from "@/lib/utils";
import { FilmIcon, SquareIcon } from "lucide-react";
import styles from "./styles.module.css";

export default function TeaserButton({ post }: { post: AudioPost }) {
  const { currentTeaserAudioId, teaserLength } = useAudioSelector(
    ({ teaserAudioId, teaserLength }) => {
      return { currentTeaserAudioId: teaserAudioId, teaserLength };
    },
  );
  const { loadTeaser, stopTeaser } = useAudioDispatch();
  const isPreviewing = currentTeaserAudioId === post.audioId;
  const length = Math.floor(teaserLength * 1000);

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isPreviewing) {
          await stopTeaser();
        } else {
          await loadTeaser(post.audioId);
        }
      }}
      // "border-accent bg-card/70 text-secondary-foreground md:hover:bg-secondary/50"
      className={cn(
        "relative py-1 w-full mt-2 rounded-md overflow-hidden transition-colors bg-card/70 border border-accent focus:outline-none before:absolute before:inset-0 before:bg-gradient-to-l before:from-primary before:pointer-events-none before:-translate-x-full",
        isPreviewing
          ? `before:opacity-100 before:translate-x-0 before:transition-transform before:ease-linear before:shadow-lg shadow-inner`
          : "md:hover:bg-secondary/50",
        isPreviewing && styles.teaserButton,
      )}
      title={isPreviewing ? "Stop previewing" : "Preview"}
      style={{ "--teaser-length-ms": `${length}ms` } as React.CSSProperties}
    >
      <div className="w-5 h-5 mx-auto relative text-muted-foreground">
        <SquareIcon
          className={
            "absolute w-full h-full transition-opacity " +
            (isPreviewing ? "opacity-100" : "opacity-0")
          }
          stroke="currentColor"
          fill="currentColor"
        />
        <FilmIcon className="w-full h-full" stroke="currentColor" />
      </div>
    </button>
  );
}

"use client";

import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { Post, isAudioPost } from "@/types/post";
import { AnimatePresence, motion } from "framer-motion";
import useAudioSelector from "@/hooks/useAudioSelector";

export default function PostWrapper({
  children,
  className,
  style,
  post,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  post: Post;
}) {
  const { currentAudioId } = useAudioSelector(({ audioId }) => ({
    currentAudioId: audioId,
  }));
  const currentAudio =
    isAudioPost(post) &&
    currentAudioId == post.audioId &&
    post.postType == "audio";
  return (
    <div
      style={style}
      className={cn(
        "group w-[calc(100% + 2rem)] sm:w-full -mx-4 sm:mx-0 sm:rounded-md ring-1 md:hover:shadow-md transition-all duration-200 overflow-hidden bg-card ring-border md:hover:ring-accent before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none",
        styles.post,
        className,
        currentAudio ? "before:opacity-100" : "md:hover:bg-background",
      )}
    >
      <AnimatePresence>
        {currentAudio ? (
          <motion.div
            initial={{ opacity: 0, height: 0, borderBottomWidth: 0 }}
            animate={{ opacity: 1, height: "auto", borderBottomWidth: 1 }}
            exit={{ opacity: 0, height: 0, borderBottomWidth: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="relative text-sm text-muted-foreground bg-muted pl-2 truncate border-border"
          >
            now playing...
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </div>
  );
}

"use client";

import { AudioState } from "@/contexts/types";
import useAudioSelector from "@/hooks/useAudioSelector";
import useMotionSafe from "@/hooks/useMotionSafe";
import { cn } from "@/lib/utils";
import throttle from "@/utils/throttle";
import { ChevronUpIcon } from "lucide-react";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ScrollToTopButton({
  scrollAreaRef,
  className,
}: {
  scrollAreaRef: MutableRefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isMotionSafe = useMotionSafe();

  const selector = useCallback((state: AudioState) => {
    return { audioId: state.audioId };
  }, []);

  const { audioId } = useAudioSelector(selector);

  const showAudioPlayer = audioId !== undefined;

  useEffect(() => {
    const scrollAreaEl = scrollAreaRef.current;
    if (scrollAreaEl === null) return;

    const checkScrollTop = throttle(() => {
      if (scrollingTimeoutRef.current) return;
      setShowScrollTop((prev: boolean) => {
        return scrollAreaEl.scrollTop > 1000;
      });
    }, 200);

    scrollAreaEl.addEventListener("scroll", checkScrollTop);
    return () => {
      scrollAreaEl.removeEventListener("scroll", checkScrollTop);
    };
  }, [scrollAreaRef]);

  const resetScrollingTimeout = useCallback(() => {
    if (scrollingTimeoutRef.current) clearTimeout(scrollingTimeoutRef.current);
    scrollingTimeoutRef.current = null;
    setShowScrollTop(false);
  }, [scrollingTimeoutRef]);

  const handleScrollToTop = useCallback(() => {
    const scrollAreaEl = scrollAreaRef.current;
    if (scrollAreaEl === null) return;

    scrollingTimeoutRef.current = setTimeout(resetScrollingTimeout, 1500);
    setShowScrollTop(false);
    setTimeout(() => {
      scrollAreaEl.scrollTo({
        top: 0,
        behavior: isMotionSafe ? "smooth" : "instant",
      });
    }, 20);
  }, [isMotionSafe, resetScrollingTimeout, scrollAreaRef]);

  return (
    <button
      onClick={handleScrollToTop}
      disabled={!showScrollTop}
      className={cn(
        "fixed bottom-4 left-4 w-12 h-12 bg-primary rounded-full text-primary-foreground flex items-center justify-center group transition-all duration-100",
        showScrollTop
          ? "scale-100 opacity-100 ease-out md:active:scale-90 md:hover:brightness-110 cursor-pointer md:hover:shadow-lg"
          : "scale-0 opacity-0 ease-in",
        showAudioPlayer && "bottom-20 md:bottom-28",
        className,
      )}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon
        className="w-8 h-8 md:group-hover:translate-y-[-2px] transition-transform"
        aria-hidden
      />
    </button>
  );
}

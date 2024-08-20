import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 *
 * scrolled text element when text cannot fit.
 * idleTime and speed are not properly respected because the ratio between movement and idle time is constant, see the tailwind.config.
 *
 * @param text Text content
 * @param isVertical boolean, indicates that scrolling is vertical.
 * @param speed indicates scrolling speed in pixels per second.
 * @param pauseTime indicates the number of seconds the text should pause in each end.
 * @param pauseOnHover indicates that the animation should pause when element is hovered.
 * @returns
 */
export default function ScrollingText({
  className,
  isVertical = false,
  speed,
  pauseOnHover,
  children,
  pauseTime,
}: {
  className?: string;
  isVertical?: boolean;
  speed?: number;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  pauseTime?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [textIsOverflow, setTextIsOverflow] = useState(false);

  const applyScrollAnimation = useCallback(() => {
    const checkOverflow = (element: HTMLElement) => {
      return isVertical
        ? element.scrollHeight > element.clientHeight
        : element.scrollWidth > element.clientWidth;
    };
    const deltaDist = (element: HTMLElement) => {
      return isVertical
        ? element.scrollHeight - element.clientHeight
        : element.scrollWidth - element.clientWidth;
    };

    const containerElement = containerRef.current;
    if (!containerElement) return;

    const isOverflowing = checkOverflow(containerElement);
    setTextIsOverflow(isOverflowing);
    if (!isOverflowing) return;

    const containerDimension = isVertical
      ? containerElement.clientHeight
      : containerElement.clientWidth;
    const animatedElement = containerElement.firstChild as HTMLElement;
    animatedElement.style.setProperty(
      "--translate-distance",
      `${containerDimension}px`,
    );
    const pixelsPerSecond = speed ? speed : 10;
    const travelTime = deltaDist(containerElement) / pixelsPerSecond;
    const idleTime = pauseTime ? pauseTime : 2;
    const animationTime = 2 * travelTime + 2 * idleTime;
    animatedElement.style.setProperty(
      "--translate-time",
      String(animationTime) + "s",
    );
  }, [isVertical, pauseTime, speed]);

  useEffect(() => {
    window.addEventListener("resize", applyScrollAnimation);

    return () => {
      window.removeEventListener("resize", applyScrollAnimation);
    };
  }, [applyScrollAnimation]);

  // const childrenString = children?.toString();
  useEffect(applyScrollAnimation, [children, applyScrollAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        isVertical ? "h-full" : "w-full",
        "overflow-hidden",
        className,
      )}
    >
      <div
        className={`${pauseOnHover ? "hover:pause" : ""} ${isVertical ? "h-min" : "w-min"} ${isVertical ? "" : "whitespace-nowrap"} ${textIsOverflow ? (isVertical ? "animate-text-scroll-vertical" : "animate-text-scroll-horizontal") : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

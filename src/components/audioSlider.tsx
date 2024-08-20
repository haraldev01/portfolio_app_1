"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import useAudioSlider from "@/hooks/useAudioSlider";

export const StyledSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group p-1",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary shadow-inner">
      <SliderPrimitive.Range className="absolute h-full bg-primary md:bg-primary/80 md:group-hover:bg-primary rounded-r-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block md:hidden md:group-hover:block h-3 w-3 rounded-full bg-muted-foreground disabled:pointer-events-none disabled:opacity-50 md:hover:cursor-pointer outline-none" />
    {/* REMOVED FROM THUMB CLASSNAME: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background 
		ADDED: outline-none */}
  </SliderPrimitive.Root>
));
StyledSlider.displayName = SliderPrimitive.Root.displayName;

export function AudioSlider({ className }: { className?: string }) {
  const {
    audioLength,
    isInteracting,
    sliderValue,
    tempSliderValue,
    setSliderValue,
    setTempSliderValue,
  } = useAudioSlider();
  return (
    <StyledSlider
      className={className}
      max={audioLength}
      value={isInteracting ? [tempSliderValue] : [sliderValue]}
      defaultValue={[0]}
      onValueChange={(value) => setTempSliderValue(value[0])}
      onValueCommit={setSliderValue}
    />
  );
}

"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import useAudioSlider from "@/hooks/useAudioSlider";
import useAudioSelector from "@/hooks/useAudioSelector";

const StyledSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group h-[100px]",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden rounded-md bg-gray-300">
      <SliderPrimitive.Range className="absolute h-full bg-pink-500 md:bg-primary md:group-hover:bg-pink-500 rounded-r-md" />
    </SliderPrimitive.Track>
  </SliderPrimitive.Root>
));
StyledSlider.displayName = SliderPrimitive.Root.displayName;

export function ClassicAudioSlider({ audioId }: { audioId: string }) {
  const {
    audioLength,
    isInteracting,
    sliderValue,
    tempSliderValue,
    setSliderValue,
    setTempSliderValue,
  } = useAudioSlider();
  const { currentAudioId } = useAudioSelector(({ audioId }) => ({
    currentAudioId: audioId,
  }));
  return (
    <StyledSlider
      max={audioLength}
      value={
        audioId === currentAudioId
          ? isInteracting
            ? [tempSliderValue]
            : [sliderValue]
          : [0]
      }
      defaultValue={[0]}
      onValueChange={(value) => setTempSliderValue(value[0])}
      onValueCommit={setSliderValue}
    />
  );
}

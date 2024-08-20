import { useCallback, useEffect, useRef, useState } from "react";
import useAudioSelector from "./useAudioSelector";
import useAudioDispatch from "./useAudioDispatch";

export default function useAudioSlider() {
  const [sliderValueState, setSliderValueState] = useState(0);
  const [tempSliderValueState, setTempSliderValueState] = useState(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false); // Track user interaction

  const { currentTime, audioLength } = useAudioSelector(
    ({ currentTime, audioLength }) => ({
      currentTime,
      audioLength,
    }),
  );
  const { handleManualTimeChange } = useAudioDispatch();

  useEffect(() => {
    if (isInteracting) return;
    setSliderValueState(currentTime);
  }, [currentTime, isInteracting]);

  const setTempSliderValue = useCallback((value: number) => {
    setIsInteracting(true);
    setTempSliderValueState(value);
  }, []);

  const setSliderValue = (value: Array<number>) => {
    setIsInteracting(false); // User interaction ended
    handleManualTimeChange(value[0]);
  };

  return {
    sliderValue: sliderValueState,
    audioLength,
    isInteracting,
    tempSliderValue: tempSliderValueState,
    setSliderValue,
    setTempSliderValue,
  };
}

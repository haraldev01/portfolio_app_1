import { useContext, useMemo } from "react";
import AudioStateContext from "../contexts/audioStateContext";
import { AudioState } from "../contexts/types";

const useAudioSelector = <T>(selector: (state: AudioState) => T): T => {
  const state = useContext(AudioStateContext);
  if (state === undefined) {
    throw new Error("useAudioSelector must be used within an AudioProvider");
  }
  const selectedState = useMemo(() => selector(state), [state, selector]);
  return selectedState;
};

export default useAudioSelector;

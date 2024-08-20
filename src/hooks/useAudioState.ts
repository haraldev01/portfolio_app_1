import { useContext } from "react";
import AudioStateContext from "../contexts/audioStateContext";

const useAudioState = () => {
  const context = useContext(AudioStateContext);
  if (context === undefined) {
    throw new Error("useAudioState must be used within an AudioProvider");
  }
  return context;
};

export default useAudioState;

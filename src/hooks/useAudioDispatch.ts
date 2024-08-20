import { useContext } from "react";
import AudioDispatchContext from "../contexts/audioDispatchContext";

const useAudioDispatch = () => {
  const context = useContext(AudioDispatchContext);
  if (context === undefined) {
    throw new Error("useAudioDispatch must be used within an AudioProvider");
  }
  return context;
};

export default useAudioDispatch;

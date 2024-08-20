import { createContext } from "react";
import { AudioState } from "./types";

const AudioStateContext = createContext<AudioState | undefined>(undefined);

export default AudioStateContext;

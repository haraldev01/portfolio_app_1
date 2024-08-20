import { createContext } from "react";
import { AudioDispatch } from "./types";

const AudioDispatchContext = createContext<AudioDispatch | undefined>(
  undefined,
);

export default AudioDispatchContext;

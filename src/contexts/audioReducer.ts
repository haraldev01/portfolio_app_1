import { AudioAction, AudioState } from "./types";

export const initialState: AudioState = {
  audioPost: undefined,
  audioLength: 0,
  currentTime: 0,
  isPlaying: false,
  volume: 100,
  isMuted: false,
  audioId: undefined,
  teaserAudioId: undefined,
  teaserLength: 0,
  playTime: 0,
};

export const audioReducer = (
  state: AudioState,
  action: AudioAction,
): AudioState => {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0,
      };
    case "SET_MUTED":
      return { ...state, isMuted: action.payload };
    case "SET_AUDIO_LENGTH":
      return { ...state, audioLength: action.payload };
    case "SET_AUDIO_ID":
      return { ...state, audioId: action.payload };
    case "SET_TEASER_AUDIO_ID":
      return { ...state, teaserAudioId: action.payload };
    case "SET_TEASER_LENGTH":
      return { ...state, teaserLength: action.payload };
    case "SET_AUDIO_POST":
      return { ...state, audioPost: action.payload };
    case "INCREMENT_PLAY_TIME":
      return { ...state, playTime: state.playTime + 1 };
    case "RESET_PLAY_TIME":
      return { ...state, playTime: 0 };
    default:
      return assertNever(action);
  }
};

function assertNever(action: never): never {
  throw new Error(`Unhandled action type: ${action}`);
}

import { AudioPost } from "@/types/post";

export type Creator = {
  displayName: string;
  username: string;
};

export interface AudioState {
  audioPost: AudioPost | undefined;
  audioId: string | undefined;

  isPlaying: boolean;
  currentTime: number;
  audioLength: number;
  playTime: number;

  teaserAudioId: string | undefined;
  teaserLength: number;

  volume: number;
  isMuted: boolean;
}

export type AudioAction =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_MUTED"; payload: boolean }
  | { type: "SET_AUDIO_LENGTH"; payload: number }
  | { type: "SET_AUDIO_ID"; payload: string }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_TEASER_AUDIO_ID"; payload: string | undefined }
  | { type: "SET_TEASER_LENGTH"; payload: number }
  | { type: "SET_AUDIO_POST"; payload: AudioPost | undefined }
  | { type: "INCREMENT_PLAY_TIME" }
  | { type: "RESET_PLAY_TIME" };

export interface AudioDispatch {
  pause: () => void;
  play: () => Promise<void>;
  toggleMute: () => void;
  skipTen: () => void;
  reverseTen: () => void;
  handleManualTimeChange: (newCurrentTime: number) => void;
  loadAudio: (newAudioId: string, audioPost?: AudioPost) => Promise<void>;
  getVolume: () => number;
  getAudioTitle: () => string;
  setVolume: (newVolume: number) => void;
  loadTeaser: (teaserAudioId: string) => Promise<void>;
  stopTeaser: () => Promise<void>;
}

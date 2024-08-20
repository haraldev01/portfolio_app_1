import { AudioPost } from "@/types/post";
import useAudioDispatch from "./useAudioDispatch";
import useAudioSelector from "./useAudioSelector";

// Function overloads
export default function usePlayButton(
  audioId: string,
  audioPost?: AudioPost,
): {
  isCurrentAudio: boolean;
  isCurrentAudioAndPlaying: boolean;
  onClick: (() => void) | (() => Promise<void>);
};
export default function usePlayButton(): {
  isPlaying: boolean;
  onClick: (() => void) | (() => Promise<void>);
};

// Implementation
export default function usePlayButton(audioId?: string, audioPost?: AudioPost) {
  const { currentAudioId, isPlaying } = useAudioSelector(
    ({ audioId, isPlaying }) => ({
      currentAudioId: audioId,
      isPlaying,
    }),
  );
  const { loadAudio, play, pause } = useAudioDispatch();

  if (audioId) {
    // Logic for when audioId is provided
    const isCurrentAudio = currentAudioId === audioId;
    const onClick: (() => void) | (() => Promise<void>) = isCurrentAudio
      ? isPlaying
        ? pause
        : play
      : () => loadAudio(audioId, audioPost);

    return {
      isCurrentAudio,
      isCurrentAudioAndPlaying: isCurrentAudio && isPlaying,
      onClick,
    };
  } else {
    // Logic for when audioId is not provided
    const onClick: (() => void) | (() => Promise<void>) = isPlaying
      ? pause
      : play;
    return {
      isPlaying,
      onClick,
    };
  }
}

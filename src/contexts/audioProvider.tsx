"use client";

import React, {
  useReducer,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import AudioStateContext from "./audioStateContext";
import AudioDispatchContext from "./audioDispatchContext";
import { titleCase } from "title-case";
import { audioReducer, initialState } from "./audioReducer";
import { AudioPost } from "@/types/post";
import incrementAudioListens from "@/actions/incrementAudioListens";

const fullAudioUrl = "/audio/full/Se Det.wav";
const teaserAudioUrl = "/audio/teaser/teaser.mp3";
const AUDIO_LISTEN_REGISTER_LIMIT = 30;

export default function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const fullAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const teaserAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeTeaser = useRef<boolean | undefined>(undefined);
  const isTeaserPlaying = state.teaserAudioId !== undefined;
  const trackCurrentTimeInterval = useRef<NodeJS.Timeout | null>(null);

  const hasListenedRef = useRef(false);

  const stopTeaserAudio = useCallback(() => {
    const audioElement = teaserAudioElementRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = "";
    }

    dispatch({ type: "SET_TEASER_AUDIO_ID", payload: undefined });
  }, []);

  const play: () => Promise<void> = useCallback(async () => {
    // stop teaser if teaser is playing
    if (wasPlayingBeforeTeaser.current !== undefined) {
      stopTeaserAudio();
      wasPlayingBeforeTeaser.current = undefined;
    }

    const audioElement = fullAudioElementRef.current;
    if (!audioElement) return;

    await audioElement.play();
    dispatch({ type: "PLAY" });

    if (trackCurrentTimeInterval.current) {
      clearInterval(trackCurrentTimeInterval.current);
    }

    trackCurrentTimeInterval.current = setInterval(() => {
      dispatch({
        type: "SET_CURRENT_TIME",
        payload: Math.round(audioElement.currentTime),
      });
      dispatch({ type: "INCREMENT_PLAY_TIME" });
    }, 1000);
  }, [stopTeaserAudio]);

  const handleManualTimeChange = useCallback((newCurrentTime: number) => {
    const audioElement = fullAudioElementRef.current;
    if (!audioElement) return;

    audioElement.currentTime = newCurrentTime;
    dispatch({ type: "SET_CURRENT_TIME", payload: newCurrentTime });
  }, []);

  useEffect(() => {
    const teaserAudioElement = teaserAudioElementRef.current;
    if (!teaserAudioElement) throw new Error("Teaser audio element not found");

    const fullAudioElement = fullAudioElementRef.current;
    if (!fullAudioElement) throw new Error("Full audio element not found");
    const handleTeaserAudioEnded = async () => {
      dispatch({ type: "SET_TEASER_AUDIO_ID", payload: undefined });
      if (wasPlayingBeforeTeaser.current) {
        await play();
      }
      wasPlayingBeforeTeaser.current = undefined;
    };
    teaserAudioElement.addEventListener("ended", handleTeaserAudioEnded);

    const handleFullTeaserLoaded = () => {
      dispatch({
        type: "SET_TEASER_LENGTH",
        payload: teaserAudioElement.duration,
      });
    };
    teaserAudioElement.addEventListener(
      "loadedmetadata",
      handleFullTeaserLoaded,
    );

    const handleFullAudioEnded = () => {
      dispatch({ type: "PAUSE" });
      handleManualTimeChange(0);
    };
    fullAudioElement.addEventListener("ended", handleFullAudioEnded);

    const handleFullAudioLoaded = () => {
      dispatch({
        type: "SET_AUDIO_LENGTH",
        payload: fullAudioElement.duration,
      });
    };
    fullAudioElement.addEventListener("loadedmetadata", handleFullAudioLoaded);

    return () => {
      // cannot await these promises, as async cleanup function doesn't work.
      // but this only runs on unmount, which won't happen before the window closes.
      fullAudioElement.pause();
      fullAudioElement.src = "";
      fullAudioElement.removeEventListener("ended", handleFullAudioEnded);

      teaserAudioElement.pause();
      teaserAudioElement.src = "";
      teaserAudioElement.removeEventListener("ended", handleTeaserAudioEnded);

      fullAudioElement.removeEventListener(
        "loadedmetadata",
        handleFullAudioLoaded,
      );
      teaserAudioElement.removeEventListener(
        "loadedmetadata",
        handleFullTeaserLoaded,
      );
    };
  }, [handleManualTimeChange, play]);

  // fetch audio post when audioId changes.
  useEffect(() => {
    if (state.audioId == undefined) return;

    dispatch({ type: "RESET_PLAY_TIME" });
    hasListenedRef.current = false;

    fetch(`/api/audios/${state.audioId}`)
      .then((res) => res.json())
      .then((audioPost: AudioPost) => {
        dispatch({ type: "SET_AUDIO_POST", payload: audioPost });
      })
      .catch(console.error);
  }, [state.audioId]);

  const incrementListens = useCallback(() => {
    if (state.audioId == undefined) return;
    incrementAudioListens({ audioId: state.audioId });
  }, [state.audioId]);

  useEffect(() => {
    if (state.playTime !== AUDIO_LISTEN_REGISTER_LIMIT) return;
    if (hasListenedRef.current) return;
    hasListenedRef.current = true;
    incrementListens();
  }, [incrementListens, state.playTime]);

  const pause = useCallback(() => {
    const audioElement = fullAudioElementRef.current;
    if (!audioElement) return;

    audioElement.pause();
    dispatch({ type: "PAUSE" });

    if (trackCurrentTimeInterval.current) {
      clearInterval(trackCurrentTimeInterval.current);
      trackCurrentTimeInterval.current = null;
    }
  }, []);

  const loadAndPlayAudio = useCallback(
    async (audioId: string, isTeaser: boolean = false) => {
      if (isTeaser) {
        if (state.isPlaying) pause();
        if (wasPlayingBeforeTeaser.current === undefined) {
          wasPlayingBeforeTeaser.current = state.isPlaying;
        }

        const audioElement = teaserAudioElementRef.current;
        if (!audioElement) return;

        audioElement.src = teaserAudioUrl;
        audioElement.currentTime = 0;
        await audioElement.play();

        dispatch({ type: "SET_TEASER_AUDIO_ID", payload: audioId });
        return;
      }

      const audioElement = fullAudioElementRef.current;
      if (!audioElement) return;
      audioElement.src = fullAudioUrl;

      dispatch({ type: "SET_AUDIO_ID", payload: audioId });
      dispatch({ type: "SET_CURRENT_TIME", payload: 0 });
      audioElement.currentTime = 0;
      await play();
    },
    [pause, state.isPlaying, play],
  );

  const loadTeaser = useCallback(
    async (teaserAudioId: string) => {
      if (wasPlayingBeforeTeaser.current === undefined) {
        wasPlayingBeforeTeaser.current = state.isPlaying;
      }
      if (state.isPlaying) {
        await pause();
      }
      await loadAndPlayAudio(teaserAudioId, true);
    },
    [state.isPlaying, pause, loadAndPlayAudio],
  );

  const loadAudio = useCallback(
    async (audioId: string, audioPost?: AudioPost) => {
      if (audioPost) {
        dispatch({ type: "SET_AUDIO_POST", payload: audioPost });
      }
      await loadAndPlayAudio(audioId, false);
    },
    [loadAndPlayAudio],
  );

  const stopTeaser = useCallback(async () => {
    if (!isTeaserPlaying) return;

    stopTeaserAudio();

    if (wasPlayingBeforeTeaser.current) {
      // wasPlayingBeforeTeaser.current = undefined;
      await play();
      wasPlayingBeforeTeaser.current = undefined;
    }
  }, [isTeaserPlaying, play, stopTeaserAudio]);

  const setVolume = useCallback((newVolume: number) => {
    if (newVolume == 0) {
      dispatch({ type: "SET_MUTED", payload: true });
    }
    dispatch({ type: "SET_VOLUME", payload: newVolume });
  }, []);

  const toggleMute = useCallback(() => {
    if (state.isMuted && state.volume == 0) {
      setVolume(30);
      return;
    }
    dispatch({ type: "SET_MUTED", payload: !state.isMuted });
  }, [state.isMuted, state.volume, setVolume]);

  useEffect(() => {
    const fullAudioElement = fullAudioElementRef.current;
    if (!fullAudioElement) throw new Error("fullAudioElement not found");
    const teaserAudioElement = teaserAudioElementRef.current;
    if (!teaserAudioElement) throw new Error("teaserAudioElement not found");

    if (state.isMuted) {
      fullAudioElement.volume = 0;
      teaserAudioElement.volume = 0;
    } else {
      fullAudioElement.volume = state.volume / 100;
      teaserAudioElement.volume = state.volume / 100;
    }
  }, [state.isMuted, state.volume]);

  const skipTime = useCallback(
    (time: number) => {
      const audioElement = fullAudioElementRef.current;
      if (!audioElement) return;

      const newTime = Math.min(
        Math.max(audioElement.currentTime + time, 0),
        state.audioLength,
      );
      handleManualTimeChange(newTime);
    },
    [state.audioLength, handleManualTimeChange],
  );

  const getAudioTitle = useCallback(() => {
    const audioPost = state.audioPost;
    if (audioPost == undefined) return "";
    return titleCase(audioPost.name.replaceAll("_", " "));
  }, [state.audioPost]);

  return (
    <AudioStateContext.Provider value={state}>
      <AudioDispatchContext.Provider
        value={{
          play,
          pause,
          toggleMute,
          skipTen: () => skipTime(10),
          reverseTen: () => skipTime(-10),
          handleManualTimeChange,
          loadAudio,
          getVolume: () => (state.isMuted ? 0 : state.volume),
          getAudioTitle,
          setVolume,
          loadTeaser,
          stopTeaser,
        }}
      >
        <audio ref={fullAudioElementRef} />
        <audio ref={teaserAudioElementRef} />
        {children}
      </AudioDispatchContext.Provider>
    </AudioStateContext.Provider>
  );
}

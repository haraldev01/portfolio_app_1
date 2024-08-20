"use client";

import { AnimatePresence } from "framer-motion";
import PlayerDesktop from "./layout.player.desktop";
import PlayerMobile from "./layout.player.mobile";
import useAudioSelector from "@/hooks/useAudioSelector";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AudioPlayerWrapper() {
  const { value: isLargeScreen, isLoading } =
    useMediaQuery("(min-width: 960px)");
  const audioId = useAudioSelector(({ audioId }) => audioId);
  const showAudioPlayer = !isLoading && audioId !== undefined;
  return (
    <AnimatePresence>
      {showAudioPlayer ? (
        isLargeScreen ? (
          <PlayerDesktop key={"desktopPlayer"} />
        ) : (
          <PlayerMobile key={"mobilePlayer"} />
        )
      ) : null}
    </AnimatePresence>
  );
}

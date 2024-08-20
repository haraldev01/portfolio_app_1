"use client";

import { motion } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  ChevronsRightIcon,
  ChevronsLeftIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import React, { useState } from "react";
import { AudioSlider, StyledSlider } from "@/components/audioSlider";
import { formatTimeForPlayer } from "@/utils/timeUtils";
import { useKeyPress } from "@/hooks/useKeyPress";
import ScrollingText from "@/components/scrollingText";
import Link from "next/link";
import useAudioDispatch from "@/hooks/useAudioDispatch";
import useAudioSelector from "@/hooks/useAudioSelector";
import usePlayButton from "@/hooks/usePlayButton";
import AudioIcon from "@/components/icons/audioIcon";

export default function PlayerDesktop() {
  const {
    skipTen,
    reverseTen,
    getVolume,
    setVolume,
    getAudioTitle,
    toggleMute,
  } = useAudioDispatch();
  const { audioPost, currentTime, audioLength, audioId } = useAudioSelector(
    ({ audioPost, currentTime, audioLength, audioId }) => {
      return {
        audioPost,
        currentTime,
        audioLength,
        audioId,
      };
    },
  );
  const [forwardButtonPressed, setForwardButtonPressed] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(false);

  const { isPlaying, onClick: playButtonClick } = usePlayButton();

  useKeyPress([" "], async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await playButtonClick();
  });
  useKeyPress(
    ["ArrowRight"],
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      skipTen();
      setForwardButtonPressed(true);
    },
    { ctrlKeyDown: true },
  );
  useKeyPress(
    ["ArrowLeft"],
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      reverseTen();
      setBackButtonPressed(true);
    },
    {
      ctrlKeyDown: true,
    },
  );
  useKeyPress(
    ["ArrowUp"],
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setVolume(Math.max(Math.min(getVolume() + 10, 100), 0));
    },
    {
      ctrlKeyDown: true,
    },
  );
  useKeyPress(
    ["ArrowDown"],
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setVolume(Math.max(Math.min(getVolume() - 10, 100), 0));
    },
    {
      ctrlKeyDown: true,
    },
  );

  const [isShowingRemainingTime, setIsShowingRemainingTime] = useState(false);

  return (
    <motion.div
      initial={{ y: "96px" }}
      animate={{ y: "0px" }}
      exit={{ y: "96px" }}
      transition={{ ease: "easeOut", duration: 0.4 }}
      className="w-full h-24 bottom-0 fixed bg-card border-t border-border flex justify-between"
    >
      <div className="flex-1 flex">
        <Link
          className="flex-none m-2"
          href={
            audioPost
              ? `/users/${audioPost.author.username}/audios/${audioPost.audioId}`
              : "#"
          }
        >
          {audioId !== undefined ? (
            <AudioIcon
              audioId={audioId}
              username={audioPost?.author.username}
              width={80}
            />
          ) : null}
        </Link>
        {/* idk, don't remove w-2. If width is not set, scrollingtext w-full won't work and it will break. */}
        <div className="flex-1 px-2 py-5 w-2">
          <ScrollingText pauseOnHover className="font-bold text-lg">
            <Link
              href={
                audioPost
                  ? `/users/${audioPost.author.username}/audios/${audioPost.audioId}`
                  : "#"
              }
              className="hover:underline"
            >
              {getAudioTitle()}
            </Link>
          </ScrollingText>
          <ScrollingText pauseOnHover className="text-sm">
            {audioPost !== undefined
              ? [audioPost.author, ...audioPost.coAuthors].map(
                  (author, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Link
                          href={`/users/${author.username}`}
                          className="hover:underline"
                        >
                          {author.displayName}
                        </Link>
                        {index !== audioPost.coAuthors.length ? (
                          <span>, </span>
                        ) : null}
                      </React.Fragment>
                    );
                  },
                )
              : null}
          </ScrollingText>
        </div>
      </div>
      <div className="flex-1">
        <div className="mx-auto max-w-max mb-1 mt-2 flex content-center">
          <button
            onClick={() => {
              reverseTen();
              setBackButtonPressed(true);
            }}
            className="relative p-2"
            onAnimationEnd={() => setBackButtonPressed(false)}
            aria-label="back 10 seconds"
          >
            <ChevronsLeftIcon className="w-8 h-8" stroke="currentColor" />
            <span
              className={`absolute w-full h-full top-0 left-0 rounded-full bg-primary opacity-0 pointer-events-none ${
                backButtonPressed ? "animate-skip-button-click" : ""
              }`}
            />
          </button>

          <button
            onClick={playButtonClick}
            className="active:scale-[0.95] mx-6 rounded-full bg-foreground w-10 h-10 flex items-center justify-center my-auto"
            aria-label={isPlaying ? "pause" : "play"}
          >
            {isPlaying ? (
              <PauseIcon
                fill="hsl(var(--card))"
                stroke="hsl(var(--card))"
                className="w-7 h-7"
              />
            ) : (
              <PlayIcon
                fill="hsl(var(--card))"
                stroke="hsl(var(--card))"
                className="w-7 h-7"
              />
            )}
          </button>

          <button
            onClick={() => {
              skipTen();
              setForwardButtonPressed(true);
            }}
            className="relative p-2"
            onAnimationEnd={() => setForwardButtonPressed(false)}
            aria-label="skip forward 10 seconds"
          >
            <ChevronsRightIcon className="w-8 h-8" stroke="currentColor" />
            <span
              className={`absolute w-full h-full top-0 left-0 rounded-full bg-primary opacity-0 pointer-events-none ${
                forwardButtonPressed ? "animate-skip-button-click" : ""
              }`}
            />
          </button>
        </div>
        <div className="w-full flex">
          <div className="flex-none ml-auto text-xs font-medium">
            {formatTimeForPlayer(currentTime)}
          </div>
          <AudioSlider className="grow max-w-2xl" />
          <div
            className="flex-none mr-auto text-xs font-medium cursor-pointer"
            onClick={() => {
              setIsShowingRemainingTime((prev) => !prev);
            }}
            aria-label={
              isShowingRemainingTime ? "show total time" : "show remaining time"
            }
          >
            {isShowingRemainingTime ? "-" : null}
            {formatTimeForPlayer(
              isShowingRemainingTime ? audioLength - currentTime : audioLength,
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-end align-center">
        <div className="group flex w-min h-min my-auto mr-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMute();
            }}
            aria-label={getVolume() == 0 ? "Unmute" : "Mute"}
          >
            {getVolume() == 0 ? (
              <VolumeXIcon className="w-6 h-6" />
            ) : getVolume() < 75 ? (
              <Volume1Icon className="w-6 h-6" />
            ) : (
              <Volume2Icon className="w-6 h-6" />
            )}
          </button>
          <StyledSlider
            max={100}
            defaultValue={[100]}
            value={[getVolume()]}
            onValueChange={(newVol) => setVolume(newVol[0])}
            className="w-32 flex mx-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

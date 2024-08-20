"use client";

import { motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import React, { useState } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import { AudioSlider } from "@/components/audioSlider";
import ScrollingText from "@/components/scrollingText";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeForPlayer } from "@/utils/timeUtils";
import { Progress } from "@/components/ui/progress";
import useAudioSelector from "@/hooks/useAudioSelector";
import useAudioDispatch from "@/hooks/useAudioDispatch";
import usePlayButton from "@/hooks/usePlayButton";
import AudioIcon from "@/components/icons/audioIcon";

export default function PlayerMobile() {
  const { currentTime, audioLength, audioPost, audioId } = useAudioSelector(
    ({ currentTime, audioLength, audioPost, audioId }) => ({
      currentTime,
      audioId,
      audioLength,
      audioPost,
    }),
  );

  const { getAudioTitle, getVolume, reverseTen, skipTen } = useAudioDispatch();

  const { isPlaying, onClick: playButtonClick } = usePlayButton();

  const [forwardButtonPressed, setForwardButtonPressed] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(false);

  return (
    // nobodystyles prevent styles being added to the body. check vaul documentation.
    <Drawer noBodyStyles>
      {/* change to audio id once this is implemented... */}
      {audioId ? (
        <motion.div
          initial={{ y: "48px" }}
          animate={{ y: "0px" }}
          exit={{ y: "48px" }}
          transition={{ ease: "easeOut", duration: 0.4 }}
          className="fixed overflow-hidden flex bottom-3 right-3 left-3 h-14 rounded-md bg-secondary/70 ss-backdrop-blur-bar content-center border-b border-l border-r border-secondary"
        >
          <Progress
            className="fixed top-0 w-full h-1 rounded-none"
            value={currentTime}
            max={audioLength}
            aria-label="audio progress"
          />
          <DrawerTrigger className="flex-1 h-full text-left overflow-hidden pl-2">
            <ScrollingText className="-mb-1 -mt-1 text-lg font-medium">
              {getAudioTitle()}
            </ScrollingText>
            <ScrollingText className="text-xs text-muted-foreground">
              {audioPost &&
                [audioPost.author, ...audioPost.coAuthors]
                  .map((author) => author.displayName || `@${author.username}`)
                  .join(", ")}
            </ScrollingText>
          </DrawerTrigger>
          <button
            className="flex-none mx-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              playButtonClick();
            }}
            aria-label={getVolume() == 0 ? "Unmute" : "Mute"}
          >
            {isPlaying ? (
              <PauseIcon
                className="h-8 w-8"
                stroke="hsl(var(--foreground))"
                fill="hsl(var(--foreground))"
              />
            ) : (
              <PlayIcon
                className="h-8 w-8"
                stroke="hsl(var(--foreground))"
                fill="hsl(var(--foreground))"
              />
            )}
          </button>
        </motion.div>
      ) : null}
      <DrawerContent className="w-full h-full bg-black/20 ss-backdrop-blur-player border-none text-white">
        <ScrollArea className="h-full w-full overflow-y-auto mt-4 px-4">
          <div className="h-full flex flex-col -mb-16 pb-20">
            <DrawerClose className="absolute left-4 top-0">
              <ChevronDown className="w-10 h-10" />
            </DrawerClose>
            <div className="flex-1 mx-8 mt-12 mb-4 flex align-center justify-center overflow-hidden">
              {audioId !== undefined ? (
                <AudioIcon
                  audioId={audioId}
                  username={audioPost?.author.username}
                  width={512}
                />
              ) : null}
            </div>
            <div className="flex-none my-2 px-0.5">
              <DrawerClose asChild>
                <Link
                  href={
                    audioPost
                      ? `/users/${audioPost.author.username}/audios/${audioPost.audioId}`
                      : "#"
                  }
                >
                  <ScrollingText>
                    <DrawerTitle className="text-2xl max-w-64">
                      {getAudioTitle()}
                    </DrawerTitle>
                  </ScrollingText>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  href={audioPost ? `/users/${audioPost.author.username}` : "#"}
                >
                  <ScrollingText>
                    <DrawerDescription>
                      {audioPost
                        ? [audioPost.author, ...audioPost.coAuthors]
                            .map((creator) => creator.displayName)
                            .join(", ")
                        : ""}
                    </DrawerDescription>
                  </ScrollingText>
                </Link>
              </DrawerClose>
            </div>
            <div className="flex-none mb-1" data-vaul-no-drag>
              <AudioSlider />
            </div>
            <div className="flex flex-none justify-between w-full text-xs font-medium px-1 mb-1">
              <div className="flex-none">
                {formatTimeForPlayer(currentTime)}
              </div>
              <div className="flex-none">
                {formatTimeForPlayer(audioLength - currentTime)}
              </div>
            </div>
            <div className="mx-auto max-w-max flex content-center">
              <button
                onClick={() => {
                  reverseTen();
                  setBackButtonPressed(true);
                }}
                className="relative p-2"
                onAnimationEnd={() => setBackButtonPressed(false)}
              >
                <ChevronsLeftIcon className="w-8 h-8" stroke="white" />
                <span
                  className={`absolute w-full h-full top-0 left-0 rounded-full bg-white opacity-0 pointer-events-none ${
                    backButtonPressed ? "animate-skip-button-click" : ""
                  }`}
                />
              </button>

              <button
                onClick={playButtonClick}
                className="mx-6 rounded-full p-2 my-auto"
              >
                {isPlaying ? (
                  <PauseIcon fill="white" stroke="none" className="w-8 h-8" />
                ) : (
                  <PlayIcon fill="white" stroke="none" className="w-8 h-8" />
                )}
              </button>

              <button
                onClick={() => {
                  skipTen();
                  setForwardButtonPressed(true);
                }}
                className="relative p-2"
                onAnimationEnd={() => setForwardButtonPressed(false)}
              >
                <ChevronsRightIcon className="w-8 h-8" stroke="white" />
                <span
                  className={`absolute w-full h-full top-0 left-0 rounded-full bg-white opacity-0 pointer-events-none ${
                    forwardButtonPressed ? "animate-skip-button-click" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="p-4 my-2 rounded-md border border-primary/20 bg-gray-500/20">
            {audioPost
              ? audioPost.tags.map((tag, index) => (
                  // key should be tag, not index, once mock data is replaced or refined.
                  <DrawerClose asChild key={index}>
                    <Link href={`/search?includeTags=${tag}`}>
                      <Badge
                        variant="outline"
                        className="mr-1.5 mb-2 border border-primary/20 text-white"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  </DrawerClose>
                ))
              : null}
            <Separator className="my-4" />
            <span className="whitespace-pre-line">
              {audioPost ? audioPost.description : ""}
            </span>
          </div>
          <div className="p-4 mb-4 rounded-md border border-primary/20 bg-gray-500/20 flex flex-col space-y-2">
            {audioPost
              ? [audioPost.author, ...audioPost.coAuthors].map(
                  (creator, index) => {
                    return (
                      <React.Fragment key={creator.username}>
                        <DrawerClose asChild>
                          <Link
                            className="flex items-center space-x-4 whitespace-nowrap w-min pr-4"
                            href={`/users/${creator.username}`}
                          >
                            <Avatar>
                              <AvatarImage
                                src={`localhost:3000/images/profile/${creator.username}`}
                              />
                              <AvatarFallback className="bg-gray-300/20 border-pink-500/20 border-2">
                                {creator.displayName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-md font-medium leading-none">
                                {creator.displayName}
                              </p>
                            </div>
                          </Link>
                        </DrawerClose>
                        {index !== audioPost.coAuthors.length ? (
                          <Separator className="bg-gray-500/30" />
                        ) : null}
                      </React.Fragment>
                    );
                  },
                )
              : null}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

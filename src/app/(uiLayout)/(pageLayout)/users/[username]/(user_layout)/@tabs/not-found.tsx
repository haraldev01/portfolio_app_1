"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
  return (
    <div className="w-full">
      <DotLottieReact
        src="/notFoundAnimation.lottie"
        autoplay
        className="opacity-70 w-60 sm:w-80 mx-auto"
      />
      <div className="mx-auto w-fit text-lg md:text-xl mx-auto">
        {"There's nothing here..."}
      </div>
    </div>
  );
}

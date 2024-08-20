"use client";

import { useRef } from "react";
import ScrollToTopButton from "./scrollToTopButton";

export default function UILayout({ children }: { children: React.ReactNode }) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  return (
    /** height of mobile player is 12, desktop is 24. hence the padding.
     * these distances are kept here as margins, because putting them on the body
     * element as padding screws up when the drawers (player and sidebar) are opened
     * because they both have body-styles-none attributes.
     */
    <div
      ref={scrollAreaRef}
      className="fixed inset-x-0 bottom-0 top-12 md:top-14 overflow-y-scroll scroller pb-20 md:pb-24 scroll-pt-4 snap-y snap-proximity md:snap-none focus-visible:outline-none"
    >
      <main>{children}</main>
      <footer>
        <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
      </footer>
    </div>
  );
}

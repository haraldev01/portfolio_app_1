import UserPageTabs from "./userPageTabs";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    // min-height of this should be screen - header - (tailwind) h-4
    // that way, the screen can snap to this while not allowing scroll down.
    // h-4(dist from top of tabs to navbar): 1rem, h-12 (navbar mobile): 3rem, h-14 (navbar desktop): 3.5rem
    // pb-20(bottom padding mobile): 5rem, pb-24(bottom padding desktop): 6rem
    // pb-4 (bottom padding page wrapper (desktop only)): 1rem
    <div className="min-h-[calc(100dvh-1rem-3rem-5rem)] md:min-h-[calc(100dvh-1rem-3.5rem-6rem-1rem)]">
      <UserPageTabs
        username={params.username}
        className="mb-4 snap-start snap-normal"
      />
      {/* removed md:mx-0 here to eliminate colliding with side of page */}
      <div className="max-w-2xl mx-auto relative">{children}</div>
    </div>
  );
}

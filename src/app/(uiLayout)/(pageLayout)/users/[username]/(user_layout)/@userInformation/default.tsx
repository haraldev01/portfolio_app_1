import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

import LoadingBio from "./loadingBio";
import BioServer from "./bioServer";
import getUser, { type UserInformation } from "@/services/getUser";
import SocialLinks, { LoadingSocialLinks } from "./socialLinks";
import AwaitText from "./awaitText";
import FollowButton from "./followButton";
import UserStats from "./userStats";
import UserIcon from "@/components/icons/userIcon";

export default async function UserInformation({
  params,
}: {
  params: { username: string };
}) {
  // fetch user information here (display name, bio, languages, etc);
  const { username } = params;

  const mockUserPromise = getUser({ username });

  return (
    <>
      <div
        className="w-full p-2 flex flex-col sm:flex-row items-center gap-3 sm:mb-4 snap-start"
        id="userInformation"
      >
        <div className="w-20 h-20 flex-none rounded-full flex items-center justify-center border-accent border text-muted-foreground">
          <UserIcon username={username} width={80} />
        </div>
        <div className="flex-1 flex flex-col items-center sm:items-start overflow-hidden">
          <Suspense
            fallback={
              <div className="w-2/3 max-w-64 rounded-md h-8 md:h-9 bg-muted-foreground/50 animate-pulse" />
            }
          >
            <div className="text-2xl sm:text-3xl break-words overflow-hidden flex-1">
              <AwaitText
                promise={mockUserPromise}
                extractText={(user) => user.displayName || user.username}
              />
            </div>
          </Suspense>
          <div>
            <span className="text-sm sm:text-base">@{username} - </span>
            <Suspense fallback={<Badge variant={"loading"}>aaaaaaaaaa</Badge>}>
              <Badge variant="secondary" className="align-middle">
                <AwaitText
                  promise={mockUserPromise}
                  extractText={(user: UserInformation) =>
                    user.identity ? user.identity : ""
                  }
                />
              </Badge>
            </Suspense>
          </div>
        </div>
        <UserStats username={username} />
        <FollowButton username={username} />
      </div>
      <Suspense fallback={<LoadingBio />}>
        <BioServer userPromise={mockUserPromise} />
      </Suspense>
      <Suspense fallback={<LoadingSocialLinks />}>
        <SocialLinks userPromise={mockUserPromise} />
      </Suspense>
    </>
  );
}

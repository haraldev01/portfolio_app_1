"use client";

import unfollowUser from "@/actions/follow/unfollowUser";
import followUser from "@/actions/follow/followUser";
import { Button } from "@/components/ui/button";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";

export default function FollowButton({ username }: { username: string }) {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    try {
      setIsFollowed(true);
      await followUser({ username });
    } catch (error) {
      console.error("Failed to follow the user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowed(false);
      await unfollowUser({ username });
    } catch (error) {
      console.error("Failed to unfollow the user:", error);
    }
  };

  return (
    <Button
      onClick={isFollowed ? handleUnfollow : handleFollow}
      variant={isFollowed ? "outline" : "default"}
    >
      {isFollowed ? (
        <>
          unfollow <UserMinusIcon className="ml-2 w-4 h-4" aria-hidden />
        </>
      ) : (
        <>
          follow <UserPlusIcon className="ml-2 w-4 h-4" aria-hidden />
        </>
      )}
    </Button>
  );
}

import "server-only";

import { PostType } from "@/types/post";
import { setTimeout } from "timers/promises";
import { getPosts, GetPostsInterface } from "@/services/getPosts";
import { notFound } from "next/navigation";
import { PostComponent } from "./post";
import PostsPagination from "./pagination";

const CHUNKSIZE = 50;

// This component standardizes the server side component of the notes, audios, scripts and all posts pages.

export const basePostsContainerClass = "w-full flex flex-col gap-4";

export default async function UserPostsServer({
  username,
  postType,
  page,
  ...props
}: {
  username: string;
  postType?: PostType;
  page: number;
}) {
  const res: GetPostsInterface = await getPosts({
    username,
    page,
    limit: CHUNKSIZE,
    postType,
  });

  if (res.posts.length == 0) {
    notFound();
  }

  return (
    <div className={basePostsContainerClass} {...props}>
      {res.posts.map((post, postIndex) => (
        // With actual posts with unique post ids, we would use ids as keys here instead of index.
        <PostComponent
          key={postIndex}
          style={{ "--index": postIndex } as React.CSSProperties}
          post={post}
          omitUsername
        />
      ))}
      <PostsPagination page={page} maxPage={res.maxPage} />
    </div>
  );
}

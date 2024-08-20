import PostIcon from "@/components/icons/postIcon";
import {
  AudioPost,
  NotePost,
  ScriptPost,
  User,
  isAudioPost,
  isScriptPost,
} from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { CassetteTapeIcon } from "lucide-react";
import Link from "next/link";
import AudioPagePlayButton from "./audioPagePlayButton";

import { Badge } from "@/components/ui/badge";
import NSFWBadge from "@/components/nsfwBadge";
import BackButton from "./_postPageComponents/backButton";

export default function PostPage({
  post,
}: {
  post: AudioPost | ScriptPost | NotePost;
}) {
  return (
    <>
      <BackButton text={"back"} />
      <div className="w-full grid grid-cols-[minmax(0,_1fr)_auto] grid-rows-[auto_minmax(0,_1fr)] pt-4 gap-8">
        <div className="flex flex-col gap-4">
          {isAudioPost(post) || isScriptPost(post) ? (
            <div>
              <Badge variant="secondary" className="mr-2">
                {post.audience}
              </Badge>
              <NSFWBadge nsfw={post.isNSFW} />
            </div>
          ) : null}
          <h1 className="text-5xl font-bold">
            {isAudioPost(post) ? (
              <AudioPagePlayButton
                audioId={post.audioId}
                audioPost={post}
                className="inline-flex mr-4 align-middle"
              />
            ) : null}
            <span>{post.name}</span>
          </h1>
          <div>
            {"by "}
            <Link
              className="inline hover:underline"
              href={`/users/${post.author.username}`}
            >
              @{post.author.displayName}
            </Link>
            {" - "}
            <Badge variant={"secondary"} className="align-middle">
              {post.author.identity}
            </Badge>
          </div>
          <p>
            {formatDistanceToNow(post.createdAt, {
              addSuffix: true,
            })}
          </p>
          <div>
            {isAudioPost(post)
              ? post.coAuthors.map((coAuthor) => {
                  return (
                    <Badge
                      key={coAuthor.username}
                      className="mr-2 mb-1"
                      variant={"secondary"}
                    >
                      {coAuthor.displayName
                        ? coAuthor.displayName
                        : `@${coAuthor.username}`}
                    </Badge>
                  );
                })
              : null}
          </div>
        </div>
        <div>
          <div className="rounded-md overflow-hidden w-[200px] h-[200px]">
            <PostIcon
              postType={post.postType}
              audioId={isAudioPost(post) ? post.audioId : undefined}
              width={200}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div>
            {isAudioPost(post) || isScriptPost(post)
              ? post.tags.map((tag) => (
                  <Badge key={tag} className="mr-2 mb-1" variant={"secondary"}>
                    {tag}
                  </Badge>
                ))
              : null}
          </div>
          <p>{post.description}</p>
          {isAudioPost(post) ? (
            <Link
              href={`/users/${post.author.username}/audios/${post.audioId}/classic`}
              className="flex gap-2 items-center md:hidden"
            >
              <CassetteTapeIcon />
              <p>Classic Player</p>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}

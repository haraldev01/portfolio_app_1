import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { isAudioPost, isNotePost, isScriptPost, type Post } from "@/types/post";
import PlayButton from "./playButton";
import ViewCount from "./viewCount";
import Like from "./_likeButton/like";
import { formatDistanceToNow } from "date-fns";
import PostWrapper from "./postWrapper";
import { formatAudioDuration } from "@/utils/timeUtils";
import TeaserButton from "./teaserButton";
import PostIcon from "@/components/icons/postIcon";
import { Badge } from "@/components/ui/badge";
import NSFWBadge from "@/components/nsfwBadge";
import AIBadge from "@/components/aiBadge";

interface PostProps extends Omit<LinkProps, "href"> {
  // for setting enter animation index:
  style?: React.CSSProperties;
  // for everything else:
  className?: string;
  post: Post;
  omitUsername?: boolean;
}

export function PostComponent({
  post,
  className,
  omitUsername,
  style,
  ...linkProps
}: PostProps) {
  return (
    <PostWrapper className={className} style={style} post={post}>
      <Link
        {...linkProps}
        href={`/users/${post.author.username}/${isAudioPost(post) ? `audios/${post.audioId}` : isScriptPost(post) ? `scripts/${post.scriptId}` : `notes/${post.noteId}`}`}
        className={cn(
          "p-2 grid grid-cols-[auto_1fr_1fr] gap-x-2 gap-y-1",
          !isNotePost(post)
            ? "grid-rows-[auto_minmax(0,_1fr)_auto]"
            : "grid-rows-[auto_auto_auto]",
        )}
        aria-label={`${post.postType} ${post.name} by ${post.author.displayName} uploaded ${formatDistanceToNow(post.createdAt, { addSuffix: true })}`}
      >
        <div className="row-span-3">
          <div className="rounded-md h-14 w-14 md:h-20 md:w-20 overflow-hidden relative">
            <PostIcon
              postType={post.postType}
              audioId={isAudioPost(post) ? post.audioId : undefined}
              width={80}
            />
            {isAudioPost(post) ? (
              <PlayButton audioId={post.audioId} audioPost={post} />
            ) : null}
          </div>
          {isAudioPost(post) && post.hasTeaser && <TeaserButton post={post} />}
        </div>
        <div className="relative col-span-2">
          <h3 className="group/title sm:text-lg md:text-xl w-fit font-bold">
            {isAudioPost(post) || isScriptPost(post) ? (
              <NSFWBadge nsfw={post.isNSFW} className="mr-1 align-middle" />
            ) : null}

            {isAudioPost(post) || isScriptPost(post) ? (
              <Badge variant="secondary" className="align-middle mr-1">
                {post.audience}
              </Badge>
            ) : null}

            {(isAudioPost(post) && post.isScriptFill) ||
            (isScriptPost(post) && post.isUnfilled) ? (
              <Badge variant="secondary" className="align-middle mr-2">
                {isAudioPost(post) && post.isScriptFill && "Script Fill"}
                {isScriptPost(post) && post.isUnfilled && "Unfilled"}
              </Badge>
            ) : (
              <div className="w-1 inline-block" />
            )}

            <span className="md:group-hover/title:underline underline-offset-2 align-middle inline mr-2">
              {post.name}
            </span>

            {(isAudioPost(post) || isScriptPost(post)) && (
              <Badge variant="secondary" className="align-middle mr-1">
                {isAudioPost(post) && formatAudioDuration(post.duration)}
                {isScriptPost(post) && `${post.wordCount} words`}
              </Badge>
            )}

            {(isAudioPost(post) || isScriptPost(post)) && post.isAiUsed ? (
              <AIBadge className="align-middle" />
            ) : null}
          </h3>

          <p className="text-sm line-clamp-2">
            {!omitUsername && (
              <>
                {"by "}
                <Link
                  className="inline md:hover:underline underline-offset-2"
                  href={`/users/${post.author.username}`}
                >
                  {post.author.displayName}
                </Link>
                {` - `}
              </>
            )}
            {formatDistanceToNow(post.createdAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        <div
          className={cn(
            "overflow-hidden relative",
            !isNotePost(post) ? "hidden md:block" : "col-span-2 max-h-72",
          )}
        >
          <p
            className={cn(
              !isNotePost(post) ? "absolute inset-0" : "line-clamp-5",
              styles.gradient,
            )}
          >
            {post.description}
          </p>
        </div>
        {/* tags */}
        {(isAudioPost(post) || isScriptPost(post)) && (
          <div className="relative h-fit col-start-2 md:col-start-3 col-span-2 md:col-span-1">
            {post.tags.map((tag, i) => (
              <Badge key={i} className="mr-1 mb-1" variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="relative col-span-2 grid grid-cols-2 items-center">
          {isAudioPost(post) || isScriptPost(post) ? (
            <div className="justify-self-start">
              <Suspense
                fallback={
                  <div className="h-4 w-10 rounded-md bg-muted-foreground/50 animate-pulse" />
                }
              >
                <ViewCount
                  postType={post.postType}
                  postId={isAudioPost(post) ? post.audioId : post.scriptId}
                />
              </Suspense>
            </div>
          ) : (
            <div></div>
          )}
          <div className="justify-self-end">
            <Like
              postId={
                isAudioPost(post)
                  ? post.audioId
                  : isScriptPost(post)
                    ? post.scriptId
                    : post.noteId
              }
            />
          </div>
        </div>
      </Link>
    </PostWrapper>
  );
}

export function LoadingPost(
  props: { index?: number } & DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  return (
    <div
      {...(props.index !== undefined
        ? { style: { "--index": props.index } as React.CSSProperties }
        : null)}
      className={cn(
        "w-[calc(100% + 2rem)] sm:w-full -mx-4 sm:mx-0 sm:rounded-md bg-accent p-2 grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_minmax(0,_1fr)_auto] gap-x-2 gap-y-1",
        styles.loadingPost,
        props.className,
      )}
    >
      <div className="row-span-3 rounded-md bg-white/50 h-14 w-14 md:h-20 md:w-20" />
      <div className="col-span-2">
        <div className="h-6 mb-3 w-full max-w-64 bg-white/50 rounded" />
        <div className="h-3 w-full max-w-36 bg-white/50 rounded mb-1" />
      </div>
      <div className="hidden md:block md:col-start-2 md:col-end-2 md:row-start-2 md:row-end-2 pt-1">
        <div>
          <div className="w-32 h-4 bg-white/50 inline-block rounded-md mr-1" />
          <div className="w-24 h-4 bg-white/50 inline-block rounded-md" />
        </div>
        <div className="w-48 h-4 bg-white/50 rounded-md mb-2" />
        <div className="w-36 h-4 bg-white/50 rounded-md" />
      </div>
      <div className="col-start-2 md:col-start-3 col-span-2 md:col-span-1 pt-1">
        {["14", "24", "12", "16", "12", "14", "16", "20", "32", "14"].map(
          (size, i) => (
            <div
              key={i}
              className={`w-${size} h-4 mr-1 mb-1 rounded-md bg-white/50 ${i > 6 ? "hidden md:inline-block" : "inline-block"}`}
            />
          ),
        )}
        {/* </div> */}
      </div>
      <div className="flex col-span-2 justify-between">
        <div className="w-16 h-5 bg-white/50 rounded" />
        <div className="w-16 h-5 bg-white/50 rounded" />
      </div>
    </div>
  );
}

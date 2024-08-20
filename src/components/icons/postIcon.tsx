import NoteSvg from "@/../../public/note.svg";
import ScriptSvg from "@/../../public/script.svg";
import { PostType } from "@/types/post";
import AudioIcon from "./audioIcon";
import { cn } from "@/lib/utils";

export default function PostIcon({
  postType,
  audioId,
  width,
  className,
  username,
}: {
  postType: PostType;
  audioId?: string;
  username?: string;
  width: number;
  className?: string;
}) {
  const classNameBase = "w-full h-full rounded-md";
  const iconClassName = "text-muted-foreground opacity-50";

  if (postType === PostType.Audio) {
    if (audioId == undefined)
      throw new Error(
        "audioId is undefined in PostIcon when postType is Audio",
      );
    // if (username == undefined)
    //   throw new Error(
    //     "username is undefined in PostIcon when postType is Audio",
    //   );
    return (
      <AudioIcon
        audioId={audioId}
        username={username}
        width={width}
        aria-hidden
      />
    );
  }

  if (postType === PostType.Note) {
    return (
      <NoteSvg
        className={cn(classNameBase, iconClassName, className)}
        aria-hidden
      />
    );
  }

  if (postType === PostType.Script) {
    return (
      <ScriptSvg
        className={cn(classNameBase, iconClassName, className)}
        aria-hidden
      />
    );
  }
}

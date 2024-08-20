import { ClassicAudioSlider } from "@/components/classicAudioSlider";
import ClassicPlayButton from "./classicPlayButton";
import ClassicProgressBar, {
  ClassicProgressBarLoading,
} from "./classicProgressBar";
import getAudioPost from "@/services/getAudioPost";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { ClassicPlayButtonLoading } from "./classicPlayButton";

export default async function ClassicAudioPlayer({
  params,
}: {
  params: { audioSlug: string; username: string };
}) {
  const { audioSlug, username } = params;

  const postPromise = getAudioPost({ username, audioSlug });

  return (
    <div className="p-2 text-[#666] bg-card absolute inset-0 overflow-y-auto">
      <Link className="w-full h-10 mb-2 flex gap-2 items-center" href="./">
        <ArrowLeftIcon className="w-6 h-6" />
        <span className="text-md font-semibold">Exit classic player</span>
      </Link>
      <ClassicAudioSlider audioId={audioSlug} />
      <Suspense
        fallback={
          <>
            <ClassicProgressBarLoading />
            <ClassicPlayButtonLoading />
          </>
        }
      >
        {(async () => {
          const post = await postPromise;
          return (
            <>
              <ClassicProgressBar audioId={post.audioId} />
              <ClassicPlayButton audioId={post.audioId} />
            </>
          );
        })()}
      </Suspense>
      <Suspense
        fallback={
          <div className="text-center text-5xl font-bold w-full px-2 py-8 text-transparent">
            <div className="inline-block mb-2 bg-gray-300 rounded-lg">
              testi235g
            </div>
            <div className="inline-block mb-2 bg-gray-300 rounded-lg">
              testing1323
            </div>
            <div className="inline-block bg-gray-300 rounded-lg">tei1312g</div>
            {/* just getting past the webkit 1kb/1024 byte initial render limit */}
            <div className="absolute h-4 w-4 overflow-hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              condimentum enim ut bibendum scelerisque. Aliquam erat volutpat.
              Pellentesque ut magna dui. Etiam et odio felis. Ut nec dolor sed
              enim vestibulum porta sed vitae libero. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Praesent tempus elit at diam placerat, sed molestie neque
              efficitur. Maecenas quis risus egestas, euismod tellus a,
              efficitur nibh. Etiam cursus venenatis justo congue aliquet.
              Praesent sed mi ac massa pretium bibendum. Suspendisse venenatis
              sapien justo, ac finibus odio tristique a. Suspendisse potenti.
              Duis condimentum sollicitudin risus sit amet lacinia. Aenean
              interdum feugiat odio, et fermentum nunc ultricies et.
              Pellentesque sed mi interdum nisl consequat porttitor. Integer
              nibh velit, vulputate quis massa at, tristique convallis tellus.
              Phasellus id sem quis dolor feugiat cursus nec eget lorem. Fusce a
              sollicitudin nisi. Etiam elementum odio egestas mauris bibendum,
              eu bibendum erat tortor.
            </div>
          </div>
        }
      >
        {(async () => {
          const post = await postPromise;
          return (
            <div className="text-center text-5xl font-bold w-full px-2 py-8">
              {`[${post.audience}]${post.isScriptFill ? " [Script Fill] " : " "}${post.name}`}
            </div>
          );
        })()}
      </Suspense>

      <Separator />
      <Suspense
        fallback={
          <div className="p-2 text-lg text-transparent">
            {new Array(10)
              .fill(0)
              .map(() => "a".repeat(Math.floor(Math.random() * 10 + 5)))
              .map((text, i) => (
                <div
                  key={i}
                  className="inline-block mb-1 mr-1 bg-gray-300 rounded-lg"
                >
                  {text}
                </div>
              ))}
          </div>
        }
      >
        {(async () => {
          const post = await postPromise;
          return <div className="p-2 text-lg">{post.description}</div>;
        })()}
      </Suspense>
    </div>
  );
}

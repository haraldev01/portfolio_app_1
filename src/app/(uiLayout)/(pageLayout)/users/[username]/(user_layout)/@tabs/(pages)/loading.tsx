import { cn } from "@/lib/utils";
import { LoadingPost } from "../post";
import { basePostsContainerClass } from "../userPostsServer";

export default function LoadingPosts({ className }: { className?: string }) {
  return (
    <>
      {/* just getting past the webkit 1kb/1024 byte initial render limit */}
      <div className="text-transparent absolute h-4 w-4 overflow-hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
        condimentum enim ut bibendum scelerisque. Aliquam erat volutpat.
        Pellentesque ut magna dui. Etiam et odio felis. Ut nec dolor sed enim
        vestibulum porta sed vitae libero. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Praesent tempus
        elit at diam placerat, sed molestie neque efficitur. Maecenas quis risus
        egestas, euismod tellus a, efficitur nibh. Etiam cursus venenatis justo
        congue aliquet. Praesent sed mi ac massa pretium bibendum. Suspendisse
        venenatis sapien justo, ac finibus odio tristique a. Suspendisse
        potenti. Duis condimentum sollicitudin risus sit amet lacinia. Aenean
        interdum feugiat odio, et fermentum nunc ultricies et. Pellentesque sed
        mi interdum nisl consequat porttitor. Integer nibh velit, vulputate quis
        massa at, tristique convallis tellus. Phasellus id sem quis dolor
        feugiat cursus nec eget lorem. Fusce a sollicitudin nisi. Etiam
        elementum odio egestas mauris bibendum, eu bibendum erat tortor.
      </div>

      {/* absolute style here so it doesn't make parent component taller */}
      <div className={cn(basePostsContainerClass, "absolute", className)}>
        {[...Array(3)].map((_, index) => {
          return <LoadingPost index={index} key={index} />;
        })}
      </div>
    </>
  );
}

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SignupButton({ className }: { className?: string }) {
  return (
    <Link
      className={cn("z-10 flex items-center justify-center", className)}
      href="/signup"
    >
      <AnimatedGradientText>
        {/* 🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "} */}
        <div
          className={cn(
            `inline text-nowrap animate-gradient bg-gradient-to-r from-primary via-rose-500 to-red-500 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          <span>Sign Up</span>
          <span className="hidden sm:inline"> to Share</span>
          <span>!</span>
        </div>
        <ChevronRight
          aria-hidden
          className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover/animatedGradientText:translate-x-0.5"
        />
      </AnimatedGradientText>
    </Link>
  );
}

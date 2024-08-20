import { UserInformation } from "@/services/getUser";
import SocialLink from "./socialLink";
import { LoadingSocialLink } from "./socialLink";
import { cn } from "@/lib/utils";

export default async function SocialLinks({
  userPromise,
  className,
}: {
  userPromise: Promise<UserInformation>;
  className?: string;
}) {
  const user = await userPromise;
  const socialLinks = user.socials;
  if (socialLinks == undefined || socialLinks.length === 0) return null;

  return (
    <div className={cn("w-full relative", className)}>
      <div className="md:hidden absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-background z-10 pointer-events-none" />
      <div className="md:hidden absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background z-10 pointer-events-none" />
      <div className="w-full pl-2 pr-16 mb-2 pb-2 flex gap-4 overflow-x-auto md:overflow-x-hidden md:flex-wrap no-scrollbar">
        {socialLinks.map((link) => {
          return (
            <SocialLink
              key={link.link}
              url={link.link}
              text={link.text}
              className="flex-none"
            />
          );
        })}
      </div>
    </div>
  );
}

export async function LoadingSocialLinks() {
  return (
    <div className="w-full relative">
      <div className="md:hidden absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-background z-10 pointer-events-none" />
      <div className="md:hidden absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background z-10 pointer-events-none" />
      <div className="w-full pl-2 pr-16 mb-2 pb-2 flex gap-4 overflow-x-hidden">
        {new Array(3).fill(0).map((_, index) => {
          return <LoadingSocialLink key={index} className="flex-none" />;
        })}
      </div>
    </div>
  );
}

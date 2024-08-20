import { UserInformation } from "@/services/getUser";
import BioComponent from "./bio";

export default async function BioServer({
  userPromise,
  className
}: {
  userPromise: Promise<UserInformation>;
  className?: string
}) {
  const user = await userPromise;
  const bio = user.bio;
  if (!bio) return null;
  return <BioComponent bio={bio} className={className} />;
}

import { UserStats } from "./types";

export default async function getUserStats({
  username,
}: {
  username: string;
}): Promise<UserStats> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    likes: Math.ceil(Math.random() * 1000),
    followers: Math.ceil(Math.random() * 1000),
    plays: Math.ceil(Math.random() * 1000),
  };
}

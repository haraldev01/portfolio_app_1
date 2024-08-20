import UserPostsServer from "../../userPostsServer";
import { PostType } from "@/types/post";

export default function AudiosPage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { page?: string };
}) {
  const { username } = params;
  const { page } = searchParams;
  return (
    <UserPostsServer
      username={username}
      postType={PostType.Audio}
      page={page !== undefined ? Number(page) : 1}
    />
  );
}

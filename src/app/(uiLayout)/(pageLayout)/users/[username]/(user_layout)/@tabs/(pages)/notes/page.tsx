import { PostType } from "@/types/post";
import UserPostsServer from "../../userPostsServer";

export default function NotesPage({
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
      postType={PostType.Note}
      page={page !== undefined ? Number(page) : 1}
    />
  );
}

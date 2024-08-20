import UserPostsServer from "../../userPostsServer";

export default function UserPage({
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
      page={page !== undefined ? Number(page) : 1}
    />
  );
}

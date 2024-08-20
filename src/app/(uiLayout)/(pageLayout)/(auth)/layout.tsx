import { AuthPageProvider } from "./authPageContext";

export default function AuthPageLayout({
  authPage,
  togglePage,
}: {
  authPage: React.ReactNode;
  togglePage: React.ReactNode;
}) {
  return (
    <AuthPageProvider>
      {togglePage}
      {authPage}
    </AuthPageProvider>
  );
}

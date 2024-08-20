import NavbarDesktop from "./layout.navbar.desktop";
import NavbarMobile from "./layout.navbar.mobile";
import UILayout from "./UILayout";
import AudioPlayerWrapper from "./audioPlayerWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarMobile key={"mobileNavbar"} />
      <NavbarDesktop key={"desktopNavbar"} />
      <UILayout>{children}</UILayout>
      <AudioPlayerWrapper />
    </>
  );
}

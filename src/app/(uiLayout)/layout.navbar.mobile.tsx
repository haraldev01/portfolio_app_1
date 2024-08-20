import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { XIcon, MenuIcon } from "lucide-react";

import { fontHero } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import SignupButton from "./signupButton";
import DynamicThemeChangerSwitch from "@/components/themeChanger/dynamicThemeChangerSwitch";

export default function NavbarMobile() {
  return (
    <>
      {/* https://youtu.be/9d_3IMl3jvQ?t=751 for styling of drawer component to
      open from the side. */}
      <header
        className="fixed top-0 left-0 h-12 w-full flex md:hidden justify-between items-center bg-card pr-3 border-b border-border"
        aria-label="Mobile Header"
      >
        <Drawer direction="left" noBodyStyles>
          <DrawerTrigger aria-labelledby="openDrawerLabel">
            <label id="openDrawerLabel" className="sr-only">
              Open menu drawer
            </label>
            <MenuIcon className="w-12 h-12 p-1 pr-1.5 pb-1.5" aria-hidden />
          </DrawerTrigger>
          <DrawerContent className="w-3/4" id="radix-:R1flqcq:">
            <DrawerClose asChild>
              <XIcon className="h-6 w-6 absolute top-2 right-2" />
            </DrawerClose>
            <DrawerHeader>
              <DrawerClose asChild>
                <DrawerTitle asChild>
                  <Link href="/" className="mt-4">
                    <span className={cn("text-4xl", fontHero.className)}>
                      PortfolioApp!
                    </span>
                  </Link>
                </DrawerTitle>
              </DrawerClose>
            </DrawerHeader>
            {/* divider between title and links */}
            <hr className="mx-6" />
            {/* <ul className="flex flex-col gap-2 p-6 text-2xl font-semibold focus:text-primary">
            {navbarProps.map((item, index) => (
              <li key={String(index)}>
              <DrawerClose asChild>
              <Link href={item.href}>{item.title}</Link>
              </DrawerClose>
              </li>
              ))}
              </ul> */}
            <DynamicThemeChangerSwitch />
          </DrawerContent>
        </Drawer>
        <div className="flex gap-2">
          <SignupButton className="sm:mr-4" />
          <Link href="/">
            <h1 className={cn("text-3xl", fontHero.className)}>PortfolioApp!</h1>
          </Link>
        </div>
      </header>
    </>
  );
}

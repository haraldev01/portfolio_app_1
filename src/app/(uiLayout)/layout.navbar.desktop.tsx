"use client";

import Link from "next/link";
import { fontHero } from "@/styles/fonts";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import SignupButton from "./signupButton";
import DynamicThemeChanger from "@/components/themeChanger/dynamicThemeChanger";
import {
  CircleHelpIcon,
  HandHelpingIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import { useUser } from "@/contexts/userContext";
import UserIcon from "@/components/icons/userIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useLogout from "@/services/supertokens/logOut";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavbarDesktop() {
  const { user } = useUser();
  const logout = useLogout();
  const isLoggedIn = !!user;
  return (
    <header
      className="h-14 px-12 fixed z-10 top-0 w-full bg-card border-b border-border items-center justify-between hidden md:flex"
      // role="banner" (redundant)
      aria-label="Desktop Header"
    >
      <Link
        href="/"
        className={cn(fontHero.className, "text-4xl hover:text-primary")}
      >
        PortfolioApp!
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          {!isLoggedIn ? (
            <>
              <NavigationMenuItem>
                <SignupButton />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          ) : null}

          <TooltipProvider delayDuration={100}>
            {isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/users/${user?.username}`}>
                        <div className="flex gap-2 items-center">
                          {user.username}
                          <UserIcon
                            username={"hey"}
                            width={40}
                            className="bg-card rounded-full text-muted-foreground p-1 h-8 w-8"
                          />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>My Page</p>
                    </TooltipContent>
                  </Tooltip>
                </NavigationMenuItem>
                <NavigationMenuItem className="h-10">
                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger className="cursor-pointer">
                          <LogOutIcon className="bg-card rounded-full text-muted-foreground p-2 h-10 w-10 border border-border md:hover:scale-105 transition-transform md:hover:rotate-12 md:active:scale-100" />
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Log Out</p>
                      </TooltipContent>
                    </Tooltip>
                    <AlertDialogContent className="w-80 rounded-lg max-w-[calc(100vw-4rem)] mx-auto">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Log out of PortfolioApp.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Back</AlertDialogCancel>
                        <AlertDialogAction onClick={logout}>
                          Log out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </NavigationMenuItem>
              </>
            ) : null}
            <NavigationMenuItem className="h-10">
              <Tooltip>
                <TooltipTrigger>
                  <DynamicThemeChanger />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Dark Mode</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
            {isLoggedIn ? (
              <NavigationMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/settings">
                      <SettingsIcon className="bg-card rounded-full text-muted-foreground p-2 h-10 w-10 border border-border md:hover:scale-105 transition-transform md:hover:rotate-12 md:active:scale-100" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </NavigationMenuItem>
            ) : null}
            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/about">
                    <CircleHelpIcon className="bg-card rounded-full text-muted-foreground p-2 h-10 w-10 border border-border md:hover:scale-105 transition-transform md:hover:rotate-12 md:active:scale-100" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://patreon.com/portfolioapp" target="_blank">
                    <HandHelpingIcon className="bg-card rounded-full text-muted-foreground p-2 h-10 w-10 border border-border md:hover:scale-105 transition-transform md:hover:rotate-12 md:active:scale-100" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Support PortfolioApp!</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          </TooltipProvider>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

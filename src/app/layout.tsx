import type { Metadata, Viewport } from "next";
import "./globals.css";

import { fontSans } from "@/styles/fonts";

import { cn } from "@/lib/utils";

import ServiceWorkerRegistration from "./serviceWorkersRegistration";
import { ThemeProvider } from "@/components/themeProvider";

import AudioProvider from "@/contexts/audioProvider";
// not necessary to lazy load, as all window methods are called from inside effects in audioProvider.

import dynamic from "next/dynamic";
import { UserProvider } from "@/contexts/userContext";
const SuperTokensInit = dynamic(() => import("./supertokensInit"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "My Portfolio App",
  description: "Portfolio App description",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(330 10% 99%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(320 6% 10%)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full w-full overflow-hidden"
      suppressHydrationWarning
    >
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ServiceWorkerRegistration />
        <UserProvider>
          <SuperTokensInit />
          <AudioProvider>
            <ThemeProvider
              attribute="class"
              // defaultTheme="light"
              // enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AudioProvider>
        </UserProvider>
      </body>
    </html>
  );
}

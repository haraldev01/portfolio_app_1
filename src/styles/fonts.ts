import { Inter as FontSans, Satisfy as FontHero } from "next/font/google";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontHero = FontHero({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
});

export { fontSans, fontHero };

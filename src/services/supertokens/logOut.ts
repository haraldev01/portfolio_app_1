"use client";
import "client-only";

import { useRouter } from "next/navigation";
import Session from "supertokens-web-js/recipe/session";

export default function useLogout() {
  const router = useRouter();

  const logout = async () => {
    console.log("logging out");
    await Session.signOut();

    // Use the Next.js router to navigate
    router.push("/login"); // or to wherever your logic page is
  };

  return logout;
}

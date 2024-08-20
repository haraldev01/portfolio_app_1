"use client";

import { useEffect } from "react";
import { useAuthPage } from "../../authPageContext";

export default function SignupPage() {
  const { setIsLogin } = useAuthPage();
  useEffect(() => {
    setIsLogin(false);
  });
  return null;
}

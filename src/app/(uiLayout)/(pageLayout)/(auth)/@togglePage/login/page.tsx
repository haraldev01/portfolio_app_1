"use client";

import { useEffect } from "react";
import { useAuthPage } from "../../authPageContext";

export default function LoginPage() {
  const { setIsLogin } = useAuthPage();
  useEffect(() => {
    setIsLogin(true);
  });
  return null;
}

"use client";
import AuthForm from "../authForm";
import { useAuthPage } from "../authPageContext";

export default function AuthPage() {
  const { isLogin } = useAuthPage();
  if (isLogin === undefined) return null;
  return <AuthForm isLogin={isLogin} />;
}

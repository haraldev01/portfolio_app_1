"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthForm } from "./authSchema";
import { fontHero } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const form = useAuthForm(isLogin);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const submitLogin = useCallback(async (values: any) => {
    console.log("login", values);
  }, []);

  const submitSignup = useCallback(async (values: any) => {
    console.log("signup", values);
  }, []);

  return (
    <motion.div
      layout="size"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md px-4 sm:px-8 py-6 sm:mt-4 rounded-md border border-border shadow-2xl bg-card mx-auto"
    >
      <motion.div layout="position" className="flex justify-center mb-8">
        <h1 className={cn("text-5xl block mx-auto", fontHero.className)}>
          PortfolioApp!
        </h1>
      </motion.div>
      <AnimatePresence mode="popLayout">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(isLogin ? submitLogin : submitSignup)}
          >
            <motion.h2
              layout="position"
              key={isLogin ? "login" : "signup"}
              className="text-3xl font-bold mb-2"
              {...(!isInitialLoad ? fade : null)}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </motion.h2>
            <motion.p
              key={isLogin ? "loginsubtitle" : "signupsubtitle"}
              layout="position"
              className="text-muted-foreground text-sm mb-8"
              {...(!isInitialLoad ? fade : null)}
            >
              {isLogin ? "Log in to continue" : "Register your account"}
            </motion.p>
            <motion.div key={"email"} layout="position" className="mb-4">
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>{"Email"}</span>
                      {!isLogin ? (
                        <motion.span
                          className="text-muted-foreground text-xs"
                          key={"emailDescription2"}
                          {...(!isInitialLoad ? fade : null)}
                        >
                          {" (we'll never share your email.)"}
                        </motion.span>
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {!isLogin ? (
              <motion.div
                className="mb-6"
                layout="position"
                key={"username"}
                initial={isInitialLoad ? false : { opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <FormField
                  control={form.control}
                  name={"username"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            ) : null}

            <motion.div
              layout="position"
              key={"submitButton"}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button type="submit" className="w-full">
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </motion.div>
          </form>
        </Form>
        <motion.div
          layout="position"
          transition={{ duration: 0.3, ease: "easeOut" }}
          key={"footer"}
          className="text-center mt-8 mb-2"
        >
          <span>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <Link href={isLogin ? "/signup" : "/login"}>
            {isLogin ? "Sign Up!" : "Log In"}
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthForm;

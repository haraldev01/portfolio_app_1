import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Core definitions
const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username cannot be longer than 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Usernames can only contain characters, numbers and underscores",
  );
const emailSchema = z.string().email("Invalid email address");

// Login Schema
const loginSchema = z.object({
  email: emailSchema,
});

// Signup Schema
const signupSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
});

const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
};

const useSignupForm = () => {
  return useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};

const useAuthForm = (isLogin: boolean) => {
  return useForm<AuthFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      ...(!isLogin ? { username: "" } : null),
    },
  });
};

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type AuthFormData = LoginFormData | SignupFormData;

// export { useLoginForm, useSignupForm };
export { useAuthForm };
// export type { LoginFormData, SignupFormData, AuthFormData };

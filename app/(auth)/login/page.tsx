"use client";

import Link from "next/link";
import FormInput from "@/components/FormInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";

const LoginSchema = z
  .object({
    email: z
      .string({
        required_error: "Enter your Email Address",
      })
      .min(1, "Enter your Email Address")
      .email("Enter a valid Email Address"),
    password: z
      .string({
        required_error: "Enter a Password",
      })
      .min(1, "Enter a Password")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });

export type LoginInput = z.infer<typeof LoginSchema>;

export default function Login() {
  const router = useRouter();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setError,
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = async ({ email, password }) => {
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) {
      setError("email", { type: "custom", message: res.error });
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="w-96 rounded-xl border p-6">
      <div className="text-black text-2xl font-medium">Login</div>
      <div className="mt-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <FormInput
              placeholder="Enter email address"
              label="Email"
              name="email"
              type="email" />
            <FormInput
              placeholder="Enter a password"
              label="Password"
              name="password"
              type="password" />

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-indigo-600 w-full py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700">
              {isSubmitting ? "Wait..." : "Login"}
            </button>
          </form>
        </FormProvider>

        <div className="mt-4 text-center text-sm">
          Need an entity account? <Link
          href="/signup"
          className="text-indigo-600 font-medium mt-2 hover:text-indigo-700">
          Sign up today
        </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href="/forgot" className="text-indigo-600 text-sm font-medium mt-2 hover:text-indigo-700">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}

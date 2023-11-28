"use client";

import Link from "next/link";
import FormInput from "@/components/FormInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/api";
import toast from "react-hot-toast";
import { z } from "zod";

const SignupSchema = z
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

export type SignupInput = z.infer<typeof SignupSchema>;

export default function Signup() {
  const router = useRouter();

  const methods = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setError,
  } = methods;

  const onSubmitHandler: SubmitHandler<SignupInput> = async ({ email, password }) => {
    const res = await signUp(email, password);
    if (res?.error) {
      setError("email", { type: "custom", message: res.error });
    } else {
      toast.success("Account created! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="w-96 rounded-xl border p-6">
      <div className="text-black text-2xl font-medium">Create a new account!</div>
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

            <div className="text-sm mb-2">
              By signing up, you agree to <Link href="/terms-of-use" className="text-indigo-600 font-medium">Terms Of Use</Link> and <Link
              href="/privacy-policy" className="text-indigo-600 font-medium">Privacy Policy</Link>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-indigo-600 w-full py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700">
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>
        </FormProvider>


        <div className="mt-4 text-center text-sm">
          If you already have an account? <Link
          href="/login"
          className="text-indigo-600 font-medium mt-2 hover:text-indigo-700">
          Login
        </Link>
        </div>
      </div>
    </div>
  );
}

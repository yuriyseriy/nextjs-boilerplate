"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { resetPasswordForEmail } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";

const ForgetPasswordSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Email is invalid")
  });

type ForgetPasswordInput = z.infer<typeof ForgetPasswordSchema>;

export default function Forgot() {
  const [isSent, setSent] = useState(false);
  const [domain, setDomain] = useState<string | undefined>();

  const methods = useForm<ForgetPasswordInput>({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange"
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setError
  } = methods;

  const onSubmitHandler: SubmitHandler<ForgetPasswordInput> = async ({ email }) => {
    const res = await resetPasswordForEmail(email);

    if (res.error) {
      setError("email", { type: "custom", message: res.error });
    } else {
      reset();
      setSent(true);
      setDomain(email.split("@").pop());
    }
  };

  return (
    <div className="w-96 rounded-xl border p-6">
      <div className="text-black text-2xl font-medium">Reset Password</div>
      <div className="mt-6">
        {isSent ? (
          <div>
            <div className="text-sm">
              An email has been sent to your email with further steps to change your password.
            </div>
            {domain && (
              <Link
                href={`https://${domain}`}
                className="block text-center mt-8 bg-blue-600 w-full py-2.5 rounded text-white font-medium hover:bg-blue-500 disabled:bg-gray-500">
                Open mail
              </Link>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6 text-gray-500 text-sm">
              Enter your email address below and we’ll send you a reset link.
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmitHandler)}
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <FormInput
                  placeholder="Type your email"
                  label="Email"
                  name="email"
                  type="email" />

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="bg-indigo-600 w-full py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700">
                  {isSubmitting ? "Loading..." : "Next"}
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
        )}
      </div>
    </div>
  );
}

import { Resend } from "resend";
import WelcomeEmail from "@/components/email-templates/welcome";
import ActivateEmail from "@/components/email-templates/activate";
import ResetPasswordEmail from "@/components/email-templates/reset-password";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_123";
const NEXT_SITE_NAME = process.env.NEXT_SITE_NAME || "";
const NEXT_SITE_EMAIL = process.env.NEXT_SITE_EMAIL || "";

const resend = new Resend(RESEND_API_KEY);

export const sendWelcome = (email: string, name: string) => {
  return resend.emails.send({
    from: NEXT_SITE_EMAIL,
    to: [email],
    subject: `Welcome to ${NEXT_SITE_NAME}!`,
    react: WelcomeEmail({ name }),
  });
};

export const sendActivateLink = (email: string, code: string) => {
  const verifyUrl = `${NEXTAUTH_URL}/verify/${code}`;

  return resend.emails.send({
    from: NEXT_SITE_EMAIL,
    to: [email],
    subject: "Activate your account",
    react: ActivateEmail({ verifyUrl }),
  });
};

export const sendRecoveryLink = (email: string, code: string) => {
  const resetPasswordUrl = `${NEXTAUTH_URL}/resetPassword/${code}`;

  return resend.emails.send({
    from: NEXT_SITE_EMAIL,
    to: [email],
    subject: "Please reset your password",
    react: ResetPasswordEmail({ resetPasswordUrl }),
  });
};


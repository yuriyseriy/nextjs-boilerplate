import { Resend } from "resend"
import WelcomeEmail from "@/components/email-templates/welcome"
import ActivateEmail from "@/components/email-templates/activate"
import ResetPasswordEmail from "@/components/email-templates/reset-password"

const NEXTAUTH_URL = process.env.NEXTAUTH_URL
const resend = new Resend(process.env.RESEND_API_KEY)

const from = "Admin SongList <admin@songlist.dev>"

export const sendWelcome = (email: string, name: string) => {
  return resend.emails.send({
    from,
    to: [email],
    subject: "Welcome to SongList.dev!",
    react: WelcomeEmail({ name })
  })
}

export const sendActivateLink = (email: string, code: string) => {
  const verifyUrl = `${NEXTAUTH_URL}/verify/${code}`

  return resend.emails.send({
    from,
    to: [email],
    subject: "Activate your account",
    react: ActivateEmail({ verifyUrl })
  })
}

export const sendRecoveryLink = (email: string, code: string) => {
  const resetPasswordUrl = `${NEXTAUTH_URL}/resetPassword/${code}`

  return resend.emails.send({
    from,
    to: [email],
    subject: "Please reset your password",
    react: ResetPasswordEmail({ resetPasswordUrl })
  })
}


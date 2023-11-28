export default function ResetPasswordEmail({ resetPasswordUrl }: { resetPasswordUrl: string }) {
  return (
    <div>
      <h1>Reset your password</h1>
  <p>We heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following button to reset your password:</p>

  <a href={resetPasswordUrl}>Reset your password</a>
  </div>
)
}

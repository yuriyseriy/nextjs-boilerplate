export default function ActivateEmail({ verifyUrl }: { verifyUrl: string }) {
  return (
    <div>
      <h1>Verify Your Account</h1>
      <div>
        In order to provide you with the best possible service, please verify your e-mail by clicking the link below:
      </div>
      <div>
        <a href={verifyUrl}>Verify email</a>
      </div>
    </div>
  )
}

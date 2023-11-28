export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <div>
        Thank you for signing up.
      </div>
    </div>
  );
}

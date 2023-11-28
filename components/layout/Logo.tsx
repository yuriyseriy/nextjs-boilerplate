import Link from "next/link";

interface LogoProps {
  style?: "light" | "dark";
}

export default function Logo({ style }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-medium text-2xl ${style === "light" ? "text-white" : "text-black"}`}>
      <span className="text-indigo-600 font-bold">NextJS</span> Boilerplate
    </Link>
  );
}

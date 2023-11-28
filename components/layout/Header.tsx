"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BsBell, BsBoxArrowRight, BsPersonFill } from "react-icons/bs";
import Logo from "@/components/layout/Logo";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto container flex items-center h-[80px]">
        <Logo />
        <div className="basis-0 grow px-10">
          <div className="flex justify-between">
            <nav className="flex gap-8">
              <Link href="/about" className="font-medium hover:text-indigo-700 transition">About</Link>
              <Link href="/faq" className="font-medium hover:text-indigo-700 transition">FAQ</Link>
              <Link href="/contacts" className="font-medium hover:text-indigo-700 transition">Contacts</Link>
            </nav>
          </div>
        </div>
        {session ? (
          <div className="flex gap-4">
            <div className="flex rounded-lg bg-gray-100 p-1 font-semibold items-center">
              <div className="pl-5 pr-2.5 text-lg">0.00 $</div>
              <Link href="/topup"
                    className="bg-indigo-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-indigo-600">
                Add funds
              </Link>
            </div>
            <button
              className="border px-3 rounded-lg hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              <BsBell size={24} />
            </button>
            <Link href="/settings"
                  className="block py-3 border px-3 rounded-lg hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              <BsPersonFill size={24} />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="border px-3 rounded-lg hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              <BsBoxArrowRight size={24} />
            </button>
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className="bg-gray-100 px-6 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-gray-200">
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-4 bg-indigo-600 px-6 py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

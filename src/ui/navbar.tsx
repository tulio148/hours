"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { userId } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-6 p-10 md:p-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-gray-900 opacity-60">hours</h1>
        </Link>
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-up">sign-up</Link>
        )}
      </div>
    </nav>
  );
}

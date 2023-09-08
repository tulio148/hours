"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isLoaded } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-6 p-10 md:p-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-gray-900 opacity-60">hours</h1>
        </Link>
        {isLoaded ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">sign-up</Link>
        )}
      </div>
    </nav>
  );
}

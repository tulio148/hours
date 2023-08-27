"use client";

import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="text-center">
        <p>Signed in as {session.user!.email}</p>
        <a href="/api/auth/signout">Sign out</a>
      </div>
    );
  }

  return <a href="/api/auth/signin">Sign in</a>;
}

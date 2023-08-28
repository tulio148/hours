import Timer from "../ui/timer";
import Form from "@/ui/form";
import Component from "@/ui/test";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  let users = await prisma.user.findMany();
  const session = await getServerSession(authOptions);
  return (
    <main className="h-screen w-screen flex items-center justify-around flex-col">
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Component />
      <Form />
      <Timer />
    </main>
  );
}

import Timer from "../ui/timer";
import Form from "@/ui/form";
import Component from "@/ui/test";
import prisma from "@/lib/prisma";

export default async function Home() {
  let users = await prisma.user.findMany();
  return (
    <main className="h-screen w-screen flex items-center justify-around flex-col">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Component />
      <Form />
      <Timer />
    </main>
  );
}

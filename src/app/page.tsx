import Timer from "../ui/timer";
import { UserButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import Form from "@/ui/form";
export default async function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-around flex-col">
      <SignIn />
      <UserButton afterSignOutUrl="/" />
      <a
        href="/activity"
        className="text-2xl font-bold underline text-blue-500"
      >
        Activity
      </a>
      <Form />
      <Timer />
    </main>
  );
}

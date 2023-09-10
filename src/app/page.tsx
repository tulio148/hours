import Timer from "../ui/timer";
import Navbar from "@/ui/navbar";
import { getActivities, createOrUpdateUser } from "./_actions";
import { auth } from "@clerk/nextjs";
import Activities from "@/ui/activities";

export default async function Home() {
  const activities = await getActivities();
  const { userId } = auth();
  if (userId) createOrUpdateUser();

  return (
    <>
      <Navbar />
      <main className="h-screen w-screen flex flex-col max-w-3xl mx-auto">
        <Activities activities={activities} />
        <Timer />
      </main>
    </>
  );
}

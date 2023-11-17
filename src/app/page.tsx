import Timer from "../ui/timer";
import Navbar from "@/ui/navbar";
import { getActivities, upsertUser } from "./_actions";
import { auth } from "@clerk/nextjs";
import Activities from "@/ui/activities";

export default async function Home() {
  const activities = await getActivities();
  const { userId } = auth();
  if (userId) upsertUser();

  return (
    <>
      <Navbar />
      <main className="h-screen w-screen flex flex-col  items-center  max-w-7xl mx-auto">
        <Activities activities={activities} />
        <Timer />
      </main>
    </>
  );
}

import Timer from "../ui/timer";
import Form from "@/ui/form";

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-around flex-col">
      <Form />
      <Timer />
    </main>
  );
}

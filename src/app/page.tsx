import Timeline from "@/app/components/Timeline";
import StarfieldBackground from "@/app/components/StarFieldBackground";

export default function HomePage() {
  return (
    <>
      <StarfieldBackground />
      <main className="max-w-4xl mx-auto px-4 text-white relative z-10">
        <h1 className="text-3xl font-bold mt-10 mb-6 text-center">All past and future space missions</h1>
        <Timeline />
      </main>
    </>
  );
}
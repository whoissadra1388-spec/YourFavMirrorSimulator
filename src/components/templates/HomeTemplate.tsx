import BackgroundGlow from "../atoms/BackgroundGlow";
import HomeHero from "../organisms/HomeHero";
import MirrorSelection from "../organisms/MirrorSelection";

export default function HomeTemplate() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundGlow />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <HomeHero />
        <MirrorSelection />
      </section>
    </main>
  );
}
import MirrorCard from "../molecules/MirrorCard";

export default function MirrorSelection() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8">
      <MirrorCard title="Concave Mirror" type="concave" delay={0.65} />
      <MirrorCard title="Convex Mirror" type="convex" delay={0.85} />
    </div>
  );
}
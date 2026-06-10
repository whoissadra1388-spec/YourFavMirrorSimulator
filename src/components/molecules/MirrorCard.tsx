import Link from "next/link";
import GlassCard from "../atoms/GlassCard";

type MirrorCardProps = {
  title: string;
  type: "concave" | "convex";
  delay: number;
};

export default function MirrorCard({ title, type, delay }: MirrorCardProps) {
  const href = type === "concave" ? "/concave" : "/convex";

  return (
    <Link href={href} className="block">
      <GlassCard delay={delay}>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-300/10">
            <MirrorIcon type={type} />
          </div>

          <h2 className="text-center text-2xl font-medium tracking-wide text-white">
            {title}
          </h2>

          <div className="mt-5 h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        </div>
      </GlassCard>
    </Link>
  );
}

function MirrorIcon({ type }: { type: "concave" | "convex" }) {
  if (type === "concave") {
    return (
      <svg width="58" height="58" viewBox="0 0 48 48" fill="none">
        <path
          d="M22 8C31 15 31 33 22 40"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="text-cyan-200"
        />
        <path
          d="M8 16H23M8 24H25M8 32H23"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="text-white/55"
        />
      </svg>
    );
  }

  return (
    <svg width="58" height="58" viewBox="0 0 48 48" fill="none">
      <path
        d="M30 8C22 15 22 33 30 40"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        className="text-cyan-200"
      />
      <path
        d="M8 16H23M8 24H21M8 32H23"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="text-white/55"
      />
    </svg>
  );
}
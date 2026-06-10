export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute bottom-[-180px] left-[-120px] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="absolute right-[-140px] top-[35%] h-[360px] w-[360px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_55%,#000_100%)]" />
    </div>
  );
}
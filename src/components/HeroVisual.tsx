export function HeroVisual() {
  return (
    <div className="relative h-full min-h-[320px] w-full">
      <div className="mesh-blob absolute -left-8 top-6 h-40 w-40 bg-indigo-400/30" />
      <div className="mesh-blob absolute right-0 top-16 h-32 w-32 bg-cyan-400/25" />
      <div className="mesh-blob absolute bottom-4 left-1/3 h-36 w-36 bg-violet-400/20" />

      <div className="node-ring relative mx-auto flex h-full min-h-[320px] max-w-sm flex-col justify-between rounded-[28px] p-6 animate-float">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Delivery snapshot
          </span>
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-indigo-600 ring-1 ring-indigo-100">
            Live pipeline
          </span>
        </div>

        <div className="relative my-4 flex flex-1 items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="h-44 w-44 text-indigo-500/80"
            aria-hidden
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
            <circle cx="100" cy="100" r="48" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
            <line x1="100" y1="28" x2="100" y2="72" stroke="url(#lineGrad)" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="128" x2="100" y2="172" stroke="url(#lineGrad)" strokeWidth="1.5" opacity="0.5" />
            <line x1="28" y1="100" x2="72" y2="100" stroke="url(#lineGrad)" strokeWidth="1.5" opacity="0.5" />
            <line x1="128" y1="100" x2="172" y2="100" stroke="url(#lineGrad)" strokeWidth="1.5" opacity="0.5" />
            <circle cx="100" cy="28" r="6" fill="#6366f1" />
            <circle cx="172" cy="100" r="6" fill="#06b6d4" />
            <circle cx="100" cy="172" r="6" fill="#8b5cf6" />
            <circle cx="28" cy="100" r="6" fill="#ec4899" />
            <circle cx="100" cy="100" r="10" fill="white" stroke="#6366f1" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid gap-2">
          {[
            { label: "Design", value: "Scope locked" },
            { label: "Build", value: "Weekly releases" },
            { label: "Operate", value: "Always improving" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-xs ring-1 ring-slate-200/80"
            >
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

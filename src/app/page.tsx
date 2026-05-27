import Image from "next/image";
import { HeroVisual } from "@/components/HeroVisual";
import { MailIcon } from "@/components/MailIcon";

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-60 grid-overlay" />
      <div className="mesh-blob absolute left-[10%] top-24 h-64 w-64 bg-indigo-300/25" />
      <div className="mesh-blob absolute right-[5%] top-40 h-56 w-56 bg-cyan-300/20" />

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
          <a href="#" className="flex items-center gap-3.5 sm:gap-4">
            <Image
              src="/logo.png"
              alt="Himpower"
              width={64}
              height={64}
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              priority
            />
            <span className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Himpower
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="transition hover:text-foreground" href="#services">
              Services
            </a>
            <a className="transition hover:text-foreground" href="#process">
              Process
            </a>
            <a className="transition hover:text-foreground" href="#education">
              Education
            </a>
            <a className="transition hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>
          <a href="#contact" className="btn-primary rounded-full px-4 py-2 text-sm font-medium">
            Start a project
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-6 sm:pt-24">
            <div className="glass rounded-3xl p-7 sm:p-10">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    Product engineering studio
                  </div>
                  <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Craft{" "}
                    <span className="text-gradient">web & mobile</span> experiences
                    that feel ahead of their time.
                  </h1>
                  <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
                    We design, build, and maintain digital products—and create
                    training content that teams actually use. Precision
                    engineering, thoughtful UX, and a delivery rhythm built for
                    momentum.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#contact"
                      className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium"
                    >
                      Talk to us
                    </a>
                    <a
                      href="#services"
                      className="btn-secondary inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium"
                    >
                      Explore services
                    </a>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2 text-xs">
                    {[
                      "Product Engineering",
                      "Smart Delivery",
                      "Maintenance",
                      "Education",
                    ].map((tag) => (
                      <span key={tag} className="badge rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-full lg:max-w-md">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-medium text-indigo-600">What we do</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Engineering, operations, and education—unified.
              </h2>
            </div>
            <div className="hidden max-w-xs text-sm text-muted sm:block">
              Not “ship and forget”—ship, learn, and iterate with intention.
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Web & mobile development",
                desc: "From product goals to architecture and implementation. We ship fast with modern stacks like Next.js, React, and Flutter.",
                accent: "from-indigo-500/10 to-violet-500/5",
              },
              {
                title: "Maintenance & evolution",
                desc: "Bug fixes, performance tuning, refactoring, and new features—guided by real usage and operational signals.",
                accent: "from-cyan-500/10 to-sky-500/5",
              },
              {
                title: "Delivery systems",
                desc: "Workflows that raise throughput and consistency—documentation, quality gates, and automation where it matters.",
                accent: "from-violet-500/10 to-fuchsia-500/5",
              },
              {
                title: "Operational excellence",
                desc: "Monitoring, incident response, release strategy, and security fundamentals—built for long-term reliability.",
                accent: "from-sky-500/10 to-indigo-500/5",
              },
              {
                title: "Education content",
                desc: "Internal training, workshops, and online courses—hands-on curriculum with labs and clear outcomes.",
                accent: "from-pink-500/10 to-rose-500/5",
              },
              {
                title: "MVP → scale-up",
                desc: "Validate quickly, then grow with confidence—phase-based roadmaps that reduce risk at every step.",
                accent: "from-emerald-500/10 to-teal-500/5",
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`glass shine rounded-2xl bg-gradient-to-br p-6 ${s.accent}`}
              >
                <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                <p className="mt-3 text-sm leading-6 text-muted">{s.desc}</p>
                <div className="mt-6 h-px w-full bg-[var(--border)]" />
                <div className="mt-4 text-xs text-muted">
                  Deliverables: specs · code · deployment · ops guide
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="surface-panel rounded-3xl p-7 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <div className="text-sm font-medium text-cyan-600">How we deliver</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  A process built for speed—and long-term reliability
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Modern tooling woven into disciplined practice—so teams move
                  faster without trading away clarity, quality, or maintainability.
                </p>
              </div>

              <div className="grid flex-1 gap-4 md:grid-cols-2">
                {[
                  {
                    step: "01",
                    title: "Discovery",
                    desc: "Align on goals, users, priorities, and define a clear MVP scope.",
                  },
                  {
                    step: "02",
                    title: "Design & Architecture",
                    desc: "Design flows and an architecture that stays maintainable as you scale.",
                  },
                  {
                    step: "03",
                    title: "Build",
                    desc: "Ship in weekly increments with testing and documentation baked in.",
                  },
                  {
                    step: "04",
                    title: "Operate",
                    desc: "Set up monitoring, alerting, and an improvement loop to reduce ops burden.",
                  },
                ].map((p) => (
                  <div
                    key={p.step}
                    className="rounded-2xl border border-[var(--border)] bg-white/80 p-6 shadow-sm"
                  >
                    <div className="text-xs font-medium text-indigo-500">{p.step}</div>
                    <div className="mt-2 text-sm font-semibold text-slate-900">
                      {p.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-medium text-violet-600">Education</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                We build training content like a product.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Practical examples, assignments, and evaluation criteria included.
                Suitable for internal training, institutions, and online courses.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Modern engineering practices",
                  desc: "Tooling and workflows that fit real teams",
                },
                {
                  title: "Web & mobile product engineering",
                  desc: "Architecture → build → deploy → operate",
                },
                {
                  title: "Maintenance & refactoring",
                  desc: "Reliability, testing, performance, quality metrics",
                },
                {
                  title: "Team-tailored curriculum",
                  desc: "Skill assessment → roadmap → hands-on labs",
                },
              ].map((c) => (
                <div key={c.title} className="glass shine rounded-2xl p-6">
                  <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                  <div className="mt-3 text-sm text-muted">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 sm:p-12">
            <div className="mesh-blob absolute -right-16 -top-16 h-56 w-56 bg-cyan-300/30" />
            <div className="mesh-blob absolute -left-12 -bottom-16 h-56 w-56 bg-violet-300/25" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Turn ideas into products—fast.
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Share a short overview, scope, timeline, and budget. We’ll respond
                  within 1–2 business days with a proposed approach and execution
                  plan.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  className="btn-primary inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition hover:scale-[1.03]"
                  href="mailto:himpower2025@gmail.com"
                  aria-label="Email Himpower"
                  title="Email us"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
                <a
                  className="btn-secondary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium"
                  href="#services"
                >
                  Request a services deck
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-white/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-medium text-slate-800">Himpower</div>
            <div className="mt-1 text-xs">
              Web & mobile engineering · maintenance · education
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a className="transition hover:text-foreground" href="#services">
              Services
            </a>
            <a className="transition hover:text-foreground" href="#process">
              Process
            </a>
            <a className="transition hover:text-foreground" href="#education">
              Education
            </a>
            <a className="transition hover:text-foreground" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

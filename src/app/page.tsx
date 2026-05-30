"use client";

import React, { useState } from "react";
import { HeroVisual } from "@/components/HeroVisual";
import { MailIcon } from "@/components/MailIcon";
import { AtomLogo } from "@/components/AtomLogo";
import { ContactForm } from "@/components/ContactForm";
import { AdminInbox } from "@/components/AdminInbox";
import { BentoOverview } from "@/components/BentoOverview";

export default function Home() {
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [viewMode, setViewMode] = useState<"overview" | "full">("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleViewModeChange = (mode: "overview" | "full", sectionId?: string) => {
    setViewMode(mode);
    if (mode === "full" && sectionId) {
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      try {
        if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
          window.scrollTo({ top: 0, left: 0 });
        }
      } catch (e) {
        console.warn("Smooth scroll skipped:", e);
      }
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${
      viewMode === "overview"
        ? "bg-[#080d16] text-slate-300"
        : "bg-background text-foreground"
    }`}>
      {/* Decorative Overlays - explicitly back-tiered via z-[-10] to ensure absolutely no touch/click interference */}
      <div className={`pointer-events-none absolute inset-0 z-[-10] opacity-60 grid-overlay ${
        viewMode === "overview" ? "opacity-35" : ""
      }`} />
      
      {/* Floating Blobs (Adapted opacity/colors depending on view mode) - explicitly z-[-10] */}
      <div className={`mesh-blob absolute left-[10%] top-24 h-64 w-64 z-[-10] transition-all duration-700 pointer-events-none ${
        viewMode === "overview" ? "bg-indigo-500/10 blur-3xl opacity-40" : "bg-indigo-300/25 blur-[60px]"
      }`} />
      <div className={`mesh-blob absolute right-[5%] top-40 h-56 w-56 z-[-10] transition-all duration-700 pointer-events-none ${
        viewMode === "overview" ? "bg-cyan-500/10 blur-3xl opacity-30" : "bg-cyan-300/20 blur-[60px]"
      }`} />

      {/* HEADER: Responsive layout supporting Bento and traditional views */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        viewMode === "overview"
          ? "border-slate-900 bg-[#080d16]/85 text-white"
          : "border-[var(--border)] bg-white/70 text-slate-900"
      }`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          
          {/* Brand Logo & Switch Block */}
          <div className="flex items-center gap-2 sm:gap-6">
            <a href="#" className="flex items-center gap-2 shrink-0">
              <AtomLogo size={38} className="h-8 w-8 shrink-0 sm:h-11 sm:w-11" />
              <span className={`text-base font-bold tracking-tight sm:text-xl transition-colors hidden sm:inline-block ${
                viewMode === "overview" ? "text-white" : "text-slate-900"
              }`}>
                Himpower
              </span>
            </a>

            {/* Toggle Switch Capsules */}
            <div className={`relative z-50 flex items-center gap-0.5 rounded-full p-0.5 border ${
              viewMode === "overview"
                ? "bg-slate-950 border-slate-800"
                : "bg-slate-100/80 border-slate-200/60"
            }`}>
              <button
                onClick={() => handleViewModeChange("overview")}
                type="button"
                className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  viewMode === "overview"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-950"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => handleViewModeChange("full")}
                type="button"
                className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  viewMode === "full"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : viewMode === "overview"
                      ? "text-slate-400 hover:text-slate-100"
                      : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Full view
              </button>
            </div>
          </div>

          {/* Call-to-action & standard navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            {viewMode === "full" && (
              <nav className="hidden items-center gap-5 text-xs font-bold text-slate-500 md:flex">
                <a className="transition hover:text-slate-900" href="#services">
                  Services
                </a>
                <a className="transition hover:text-slate-900" href="#process">
                  Process
                </a>
                <a className="transition hover:text-slate-900" href="#education">
                  Education
                </a>
                <a className="transition hover:text-slate-900" href="#contact">
                  Contact
                </a>
              </nav>
            )}
            
            <button
              onClick={() => {
                if (viewMode === "overview") {
                  setIsContactModalOpen(true);
                } else {
                  const target = document.getElementById("contact");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              type="button"
              className="btn-primary rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer"
            >
              Start brief
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA: Switches content depending on state */}
      <main className="relative z-10">
        {viewMode === "overview" ? (
          /* Bento Dashboard View */
          <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 sm:py-4">
            <BentoOverview
              onSwitchToFullView={(sectionId) => handleViewModeChange("full", sectionId)}
              showAdminConsole={showAdminConsole}
              setShowAdminConsole={setShowAdminConsole}
              isContactModalOpen={isContactModalOpen}
              setIsContactModalOpen={setIsContactModalOpen}
            />
            
            {/* Conditional admin console container */}
            {showAdminConsole && (
              <div className="mt-8 rounded-3xl border border-slate-800 bg-[#0c1220]/90 p-5 shadow-2xl">
                <AdminInbox />
              </div>
            )}
          </div>
        ) : (
          /* Original Long Scroll View */
          <>
            <section className="relative overflow-hidden">
              <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-14 sm:px-6 sm:pt-24">
                <div className="glass rounded-3xl p-7 sm:p-10">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
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


        <section id="services" className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16">
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

        <section id="process" className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16">
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

        <section id="education" className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16">
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

        <section id="contact" className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 sm:p-12">
            <div className="mesh-blob absolute -right-16 -top-16 h-56 w-56 bg-cyan-300/20" />
            <div className="mesh-blob absolute -left-12 -bottom-16 h-56 w-56 bg-violet-300/20" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
              {/* Marketing copy & Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Turn ideas into products—fast.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">
                    We specialize in high-tempo product design, system maintenance, and customized developer training. Share your project requirements and let&apos;s craft something remarkable together.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white/70 p-5 shadow-sm space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900">Contact Channels</h4>
                  <div className="flex items-center gap-3">
                    <a
                      className="btn-primary inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:scale-[1.03]"
                      href="mailto:himpower2025@gmail.com"
                      aria-label="Email Himpower"
                      title="Email us directly"
                    >
                      <MailIcon className="h-5 w-5" />
                    </a>
                    <div>
                      <span className="block text-xs font-semibold text-slate-800">Email us directly</span>
                      <a href="mailto:himpower2025@gmail.com" className="text-xs text-indigo-650 hover:underline">
                        himpower2025@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <p className="text-xs text-slate-450 font-medium">
                    Are you the owner? Open the secure cloud database console to track proposals:
                  </p>
                  <div>
                    <button
                      onClick={() => setShowAdminConsole((prev) => !prev)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                        showAdminConsole
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-750"
                      }`}
                    >
                      {showAdminConsole ? "🔒 Clean Workspace" : "🔑 Open Admin Console"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form container */}
              <div className="w-full">
                <ContactForm />
              </div>
            </div>

            {/* Admin console section */}
            {showAdminConsole && (
              <div className="relative mt-12 pt-8 border-t border-slate-200">
                <AdminInbox />
              </div>
            )}
          </div>
        </section>
          </>
        )}
      </main>

      <footer className={`border-t transition-all duration-500 ${
        viewMode === "overview"
          ? "border-slate-900 bg-slate-950/45 text-slate-400"
          : "border-[var(--border)] bg-white/50 text-muted"
      }`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-10 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className={`font-medium transition-colors ${
              viewMode === "overview" ? "text-white" : "text-slate-800"
            }`}>
              Himpower
            </div>
            <div className="mt-1 text-xs">
              Web & mobile engineering · maintenance · education
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a className={`transition ${viewMode === "overview" ? "hover:text-white text-slate-400" : "hover:text-foreground text-muted"}`} href="#services">
              Services
            </a>
            <a className={`transition ${viewMode === "overview" ? "hover:text-white text-slate-400" : "hover:text-foreground text-muted"}`} href="#process">
              Process
            </a>
            <a className={`transition ${viewMode === "overview" ? "hover:text-white text-slate-400" : "hover:text-foreground text-muted"}`} href="#education">
              Education
            </a>
            <a className={`transition ${viewMode === "overview" ? "hover:text-white text-slate-400" : "hover:text-foreground text-muted"}`} href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

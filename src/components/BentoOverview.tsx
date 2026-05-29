"use client";

import React, { useState } from "react";
import { AtomLogo } from "./AtomLogo";
import { ContactForm } from "./ContactForm";
import { MailIcon } from "./MailIcon";

interface BentoOverviewProps {
  onSwitchToFullView: () => void;
  showAdminConsole: boolean;
  setShowAdminConsole: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BentoOverview({
  onSwitchToFullView,
  showAdminConsole,
  setShowAdminConsole,
}: BentoOverviewProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Align on business objectives, user profiles, tech constraints, and formulate a clear MVP scope.",
      tip: "Outcome: Detailed product definition & phase-1 specs."
    },
    {
      num: "02",
      title: "Design & Architecture",
      desc: "Architect scalable backend endpoints, database systems, and design intuitive responsive wireframes.",
      tip: "Outcome: Modern, modular database & visual diagrams."
    },
    {
      num: "03",
      title: "Incremental Build",
      desc: "Build using ultra-fast modern tech stacks with continuous testing, strict quality gates, and weekly reviews.",
      tip: "Outcome: Fully tested staging builds & clean repository access."
    },
    {
      num: "04",
      title: "Operate & Tune",
      desc: "Set up cloud native analytics, error monitoring, server alerts, and keep iterative feature pipelines active.",
      tip: "Outcome: Round-the-clock reliability & automatic backups."
    },
  ];

  const services = [
    {
      id: 1,
      title: "Web & Mobile Dev",
      short: "From initial product goals to deep system architecture.",
      details: "Building responsive, lightning-fast digital pipelines using React, Next.js, and multi-platform mobile technologies like Flutter. High focus on tactile responsiveness, accessibility, and stellar load times.",
      deliverable: "Next.js · Flutter · Rest APIs"
    },
    {
      id: 2,
      title: "Maintenance & Evolution",
      short: "Continuous bug fixes, speed alignments, and upgrades.",
      details: "Not just reactive maintenance. We study server workloads, handle database queries Optimization, repair visual bugs, and write backward-compatible code refactoring that keeps your service fluid.",
      deliverable: "SLA support · Performance tuning"
    },
    {
      id: 3,
      title: "Smart Delivery Systems",
      short: "Workflows that boost engineering speed & precision.",
      details: "We establish automated deployments, version tagging, test coverage tracking, and standardized README setups so your team can deploy 10x faster with 0% cognitive friction.",
      deliverable: "CI/CD setups · Dev documentation"
    },
    {
      id: 4,
      title: "Education Content",
      short: "Curated hands-on developer training & workshops.",
      details: "We construct and deliver custom coding manuals, code labs, video workshops, and assessment criteria tailored for modern tech teams or academic institutions.",
      deliverable: "Curriculum labs · Video tutorials"
    }
  ];

  const curriculumPoints = [
    { name: "Modern Engineering Workflows", info: "Standardized Git patterns + automated CI reviews" },
    { name: "Full-Stack Development", info: "Scalable databases + Next.js App Router logic" },
    { name: "Testing & Clean Architecture", info: "Unit testing coverage + security rule validation" },
    { name: "Telemetry & Cloud Monitoring", info: "Error logs mapping + system metric dashboards" }
  ];

  return (
    <div className="w-full pb-20 text-[#cbd5e1] select-none">
      {/* Outer Grid Wrapper */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto">
        
        {/* CARD 1: Brand & Value Proposition (Hero representation) */}
        <div id="bento-card-hero" className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md md:p-8 md:col-span-2 lg:col-span-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-900/40 bg-indigo-950/50 px-3 py-1 text-xs text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              Product Engineering Studio
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Craft <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">experiences</span> that feel ahead of their time.
            </h2>
            
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Himpower designs, develops, and maintains digital platforms—and writes practical education courses that teams actually use. We combine speed, UX elegance, and architectural security to keep products growing.
            </p>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-2.5">
            {["Next.js Systems", "Mobile Engineering", "Database Optimization", "SRE Readiness", "SLA Maintenance"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-800 bg-slate-900/70 px-3.5 py-1.5 text-xs font-semibold text-slate-400 shadow-inner">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 2: Central Dynamic Showcase Card (Atom Logo focus) */}
        <div id="bento-card-atom" className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/85 p-6 text-center shadow-2xl backdrop-blur-md lg:col-span-4 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 opacity-10 grid-overlay" />
          
          <div className="relative flex flex-col items-center justify-center py-4">
            <AtomLogo size={140} className="transition-transform hover:scale-105 duration-500" />
            <h3 className="mt-4 text-lg font-bold text-white tracking-tight">Active Engine</h3>
            <p className="mt-1.5 max-w-[200px] text-xs text-slate-400 leading-normal">
              Continuous delivery, clean telemetry, and modular standards running live.
            </p>
          </div>
        </div>

        {/* CARD 3: Unified Services Directory */}
        <div id="bento-card-services" className="relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md lg:col-span-4">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Services Catalog</div>
              <h3 className="mt-1 text-xl font-bold text-white">Interactive Capabilities</h3>
            </div>

            <div className="space-y-3 pt-2">
              {services.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`rounded-2xl border p-3.5 transition duration-300 cursor-pointer ${
                    hoveredService === idx 
                      ? "border-indigo-500 bg-indigo-950/40 translate-x-1" 
                      : "border-slate-800/60 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{item.deliverable.split(" ")[0]}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    {hoveredService === idx ? item.details : item.short}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500">Hover elements to inspect detailed scope</p>
          </div>
        </div>

        {/* CARD 4: Step-by-Step Delivery Path */}
        <div id="bento-card-path" className="relative flex flex-col justify-between rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">Our Framework</div>
                <h3 className="mt-1 text-xl font-bold text-white">Unified Delivery Pipeline (UDP)</h3>
              </div>
              <span className="rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-900/50 px-2.5 py-1 text-[10px] font-mono">
                Click steps to explore
              </span>
            </div>

            {/* Horizontal Timeline Controls */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 pt-2">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  type="button"
                  className={`relative rounded-2xl border p-4 text-left transition duration-300 focus:outline-none ${
                    activeStep === idx
                      ? "border-cyan-500 bg-cyan-950/30 text-white shadow-lg"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-indigo-400">{step.num}</div>
                  <div className="mt-1 text-xs font-bold text-white leading-tight">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Step Detail display area */}
            <div className="mt-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4.5 min-h-[110px] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold text-white">Scope & Activity:</div>
                <p className="text-xs leading-relaxed text-slate-450">{steps[activeStep].desc}</p>
              </div>
              <div className="mt-3.5 pt-3 border-t border-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[11px] font-medium text-[#06b6d4]">{steps[activeStep].tip}</span>
                <span className="text-[10px] font-mono text-slate-500">Methodology: Agile SRE</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Learning & Technical Labs */}
        <div id="bento-card-labs" className="relative flex flex-col justify-between rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-4">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-violet-400 tracking-wider uppercase">Instructional Lab</div>
              <h3 className="mt-1 text-xl font-bold text-white">Custom Curriculum</h3>
              <p className="mt-2 text-xs text-slate-400 leading-normal">
                Structured manuals with practical code challenges designed to level up engineering squads.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {curriculumPoints.map((item, idx) => (
                <div key={idx} className="group rounded-xl bg-slate-950/45 p-3 border border-slate-800/50 hover:border-violet-950 transition">
                  <div className="text-xs font-semibold text-white group-hover:text-violet-300 transition duration-300">{item.name}</div>
                  <div className="mt-0.5 text-[10px] text-slate-500">{item.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 6: Direct Submission & Contact coordinates */}
        <div id="bento-card-contact" className="relative overflow-hidden rounded-3xl border border-indigo-950/40 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0e1628] p-6 shadow-2xl backdrop-blur-md md:p-8 md:col-span-2 lg:col-span-8">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-700/5 blur-3xl" />
          
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-5">
            {/* Direct Channel column */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-2">
              <div className="space-y-3">
                <span className="rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-900/40 px-3 py-1 text-[10px] font-serif uppercase tracking-wider inline-block">
                  Get in touch
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">Let&apos;s build together.</h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  Submissions enter our secure cloud database immediately. Our engineering leads will review your parameters and respond via email within 1 business day.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-3">
                  <a
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-650 text-white transition hover:scale-105"
                    href="mailto:himpower2025@gmail.com"
                    aria-label="Email Himpower"
                    title="Send a mail"
                  >
                    <MailIcon className="h-4.5 w-4.5" />
                  </a>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-350">Direct Mail</span>
                    <a href="mailto:himpower2025@gmail.com" className="text-xs text-indigo-400 hover:underline">
                      himpower2025@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowAdminConsole((prev) => !prev)}
                    type="button"
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-bold transition ${
                      showAdminConsole
                        ? "bg-indigo-650 text-white"
                        : "bg-slate-800/60 hover:bg-slate-805 text-slate-300"
                    }`}
                  >
                    {showAdminConsole ? "🔒 Clean Workspace" : "🔑 Open Config Console"}
                  </button>
                </div>
              </div>
            </div>

            {/* Embedded Form column */}
            <div className="lg:col-span-3 text-slate-900 bg-slate-900/30 rounded-2xl">
              <ContactForm />
            </div>
          </div>
        </div>

      </div>

      {/* Switching bottom ribbon action */}
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-center">
        <h4 className="text-sm font-semibold text-white">Looking for the original scrolling view with detailed reports?</h4>
        <p className="mt-1 text-xs text-slate-450">Switch to the traditional vertical presentation format anywhere at your convenience.</p>
        <button
          onClick={onSwitchToFullView}
          type="button"
          className="mt-4 rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-semibold text-white transition shadow-lg shadow-indigo-600/20"
        >
          View Full Scroll Page
        </button>
      </div>
    </div>
  );
}

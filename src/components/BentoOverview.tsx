"use client";

import React, { useState } from "react";
import { AtomLogo } from "./AtomLogo";
import { ContactForm } from "./ContactForm";
import { MailIcon } from "./MailIcon";

interface BentoOverviewProps {
  onSwitchToFullView: () => void;
  showAdminConsole: boolean;
  setShowAdminConsole: React.Dispatch<React.SetStateAction<boolean>>;
  isContactModalOpen: boolean;
  setIsContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BentoOverview({
  onSwitchToFullView,
  showAdminConsole,
  setShowAdminConsole,
  isContactModalOpen,
  setIsContactModalOpen,
}: BentoOverviewProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Align on business objectives, user profiles, tech constraints, and formulate a clear MVP scope.",
      tip: "Outcome: Product definition & specs."
    },
    {
      num: "02",
      title: "Architecture",
      desc: "Architect scalable backend endpoints, database systems, and design intuitive responsive wireframes.",
      tip: "Outcome: Modular DB & system diagrams."
    },
    {
      num: "03",
      title: "Build",
      desc: "Build using ultra-fast modern tech stacks with continuous testing, strict quality gates, and weekly reviews.",
      tip: "Outcome: Fully tested staging builds."
    },
    {
      num: "04",
      title: "Operate",
      desc: "Set up cloud native analytics, error monitoring, server alerts, and keep iterative feature pipelines active.",
      tip: "Outcome: Reliability & automatic backups."
    },
  ];

  const services = [
    {
      id: 1,
      title: "Web & Mobile Dev",
      short: "From initial product goals to deep system architecture.",
      details: "Building responsive, lightning-fast digital pipelines using React, Next.js, and multi-platform mobile technologies like Flutter with high focus on tactile responsiveness.",
      deliverable: "Next.js · Flutter"
    },
    {
      id: 2,
      title: "Maintenance & Evolution",
      short: "Continuous bug fixes, speed alignments, and upgrades.",
      details: "We study server workloads, handle database queries optimization, repair visual bugs, and write backward-compatible code refactoring that keeps your service fluid.",
      deliverable: "SLA Support · Tuning"
    },
    {
      id: 3,
      title: "Smart Delivery Systems",
      short: "Workflows that boost engineering speed & precision.",
      details: "We establish automated deployments, version tagging, test coverage tracking, and standardized setups so your team can deploy 10x faster with 0% cognitive friction.",
      deliverable: "CI/CD · Automations"
    },
    {
      id: 4,
      title: "Education Content",
      short: "Curated hands-on developer training & workshops.",
      details: "We construct and deliver custom coding manuals, code labs, video workshops, and assessment criteria tailored for modern tech teams or academic institutions.",
      deliverable: "Curriculums · Labs"
    }
  ];

  const curriculumPoints = [
    { name: "Modern Engineering Workflows", info: "Git patterns + automated CI reviews" },
    { name: "Full-Stack Development", info: "Next.js App Router + Firebase DB" },
    { name: "Testing & Clean Architecture", info: "Unit testing + security rules" },
    { name: "Telemetry & Cloud Monitoring", info: "Error logs mapping + alerts setup" }
  ];

  return (
    <div className="w-full text-[#cbd5e1] select-none">
      {/* Outer Grid Wrapper - Custom restricted height on desktop to enforce non-scrolling bento layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-5 lg:h-[calc(100vh-140px)] lg:min-h-[580px] lg:max-h-[820px] auto-rows-auto">
        
        {/* CARD 1: Brand & Value Proposition (Hero representation) */}
        <div id="bento-card-hero" className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-md md:p-6 lg:p-7 md:col-span-2 lg:col-span-8 lg:row-span-2 h-full">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          
          <div className="relative space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-900/40 bg-indigo-950/50 px-3 py-1 text-[10px] sm:text-xs text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              Product Engineering Studio
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4.5xl leading-tight">
              Craft <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">experiences</span> that feel ahead of their time.
            </h2>
            
            <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
              Himpower designs, develops, and maintains digital platforms—and writes practical education courses that teams actually use. We combine speed, UX elegance, and architectural security to keep products growing.
            </p>
          </div>

          <div className="relative mt-4 flex flex-wrap gap-2">
            {["Next.js Systems", "Mobile", "DB Optimization", "SRE Readiness", "Maintenance"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-slate-400 shadow-inner">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 2: Central Dynamic Showcase Card (Atom Logo focus) */}
        <div id="bento-card-atom" className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/85 p-5 text-center shadow-2xl backdrop-blur-md lg:col-span-4 lg:row-span-2 h-full">
          <div className="pointer-events-none absolute inset-0 opacity-10 grid-overlay" />
          
          <div className="relative flex flex-col items-center justify-center">
            <AtomLogo size={105} className="transition-transform hover:scale-105 duration-500" />
            <h3 className="mt-3 text-sm font-bold text-white tracking-tight">Active Engine</h3>
            <p className="mt-1 max-w-[210px] text-[11px] text-slate-400 leading-normal">
              Continuous delivery, clean telemetry, and modular standards running live.
            </p>
          </div>
        </div>

        {/* CARD 3: Unified Services Directory */}
        <div id="bento-card-services" className="relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/95 p-4.5 shadow-2xl backdrop-blur-md lg:col-span-4 lg:row-span-3 h-full">
          <div className="space-y-3">
            <div>
              <div className="text-[9px] font-bold text-indigo-400 tracking-wider uppercase">Services Catalog</div>
              <h3 className="mt-0.5 text-base font-bold text-white">Interactive Capabilities</h3>
            </div>

            <div className="space-y-2">
              {services.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`rounded-2xl border p-2.5 transition-all duration-200 cursor-pointer ${
                    hoveredService === idx 
                      ? "border-indigo-500 bg-indigo-950/40 translate-x-1" 
                      : "border-slate-800/60 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[9px] font-mono text-cyan-400">{item.deliverable.split(" ")[0]}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-400">
                    {hoveredService === idx ? item.details : item.short}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-slate-800 text-center text-[9px] text-slate-500">
            Hover elements to inspect detailed scope
          </div>
        </div>

        {/* CARD 4: Step-by-Step Delivery Path */}
        <div id="bento-card-path" className="relative flex flex-col justify-between rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-4.5 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-5 lg:row-span-3 h-full">
          <div className="space-y-3 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[9px] font-bold text-cyan-400 tracking-wider uppercase">Our Framework</div>
                <h3 className="mt-0.5 text-base font-bold text-white">Unified Delivery Pipeline (UDP)</h3>
              </div>
              <span className="rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-900/50 px-2 py-0.5 text-[9px] font-mono">
                Click steps
              </span>
            </div>

            {/* Horizontal Timeline Controls */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  type="button"
                  className={`relative rounded-xl border p-2 text-left transition duration-200 focus:outline-none ${
                    activeStep === idx
                      ? "border-cyan-500 bg-cyan-950/30 text-white shadow-lg"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="text-[9px] font-bold font-mono text-indigo-400">{step.num}</div>
                  <div className="mt-0.5 text-[10px] font-bold text-white leading-tight truncate">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Step Detail display area */}
            <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 flex flex-col justify-between flex-grow mt-2">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-white">Scope & Activity:</div>
                <p className="text-[11px] leading-relaxed text-slate-400">{steps[activeStep].desc}</p>
              </div>
              <div className="mt-1 pt-2 border-t border-slate-900/50 flex items-center justify-between gap-1 text-[10px]">
                <span className="font-medium text-[#06b6d4]">{steps[activeStep].tip}</span>
                <span className="font-mono text-slate-500 hidden sm:inline">Agile SRE</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Learning & Technical Labs */}
        <div id="bento-card-labs" className="relative flex flex-col justify-between rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-4.5 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-3 lg:row-span-2 h-full">
          <div className="space-y-3">
            <div>
              <div className="text-[9px] font-bold text-violet-400 tracking-wider uppercase">Instructional Lab</div>
              <h3 className="mt-0.5 text-base font-bold text-white">Custom Curriculum</h3>
            </div>

            <div className="space-y-1.5">
              {curriculumPoints.map((item, idx) => (
                <div key={idx} className="group rounded-xl bg-slate-950/45 p-2 border border-slate-800/50 hover:border-violet-950 transition duration-200">
                  <div className="text-[11px] font-semibold text-white group-hover:text-violet-300 transition duration-150">{item.name}</div>
                  <div className="mt-0.5 text-[9px] text-slate-500 leading-none">{item.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 6: Interactive Prompt Brief modal launcher (Replaces massive scolling form coordinates) */}
        <div
          id="bento-card-contact"
          onClick={() => setIsContactModalOpen(true)}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900/60 p-4 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-950/20 active:scale-[0.98] flex items-center justify-between col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1 h-full"
        >
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:scale-125" />
          
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-transform group-hover:scale-105 duration-300">
              <MailIcon className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                Let&apos;s build together
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </h4>
              <p className="text-[10px] text-slate-400">Send us a project brief</p>
            </div>
          </div>
          
          <span className="rounded-full bg-indigo-600/20 group-hover:bg-indigo-650 border border-indigo-500/30 px-2.5 py-1 text-[10px] font-bold text-white transition-all duration-300 shadow-sm whitespace-nowrap">
            Start Brief
          </span>
        </div>

      </div>

      {/* Switching bottom inline container - slim and high-density */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-900/90 bg-slate-950/40 px-5 py-3 text-center sm:text-left">
        <div className="space-y-0.5">
          <h4 className="text-xs font-semibold text-white">Looking for the original scrolling view with detailed reports?</h4>
          <p className="text-[11px] text-slate-450">Switch to the traditional vertical presentation format anywhere at your convenience.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setShowAdminConsole((prev) => !prev)}
            type="button"
            className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
              showAdminConsole
                ? "bg-violet-900/30 border border-violet-800 text-violet-300"
                : "border border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-400"
            }`}
          >
            {showAdminConsole ? "🔒 Hide Console" : "🔑 Admin Console"}
          </button>
          <button
            onClick={onSwitchToFullView}
            type="button"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-[10px] font-bold text-white transition shadow-md shadow-indigo-600/10 shrink-0 cursor-pointer"
          >
            View Full Scroll Page
          </button>
        </div>
      </div>

      {/* GORGEOUS MODAL CONTAINER */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setIsContactModalOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-350 cursor-pointer"
          />
          
          {/* Contact Form card (animated scale up) */}
          <div className="relative z-10 w-full max-w-lg transform rounded-2xl bg-slate-950 border border-slate-800 p-1.5 shadow-2x transition-all max-h-[90vh] overflow-y-auto">
            {/* Absolute Close X-Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
              aria-label="Close form"
            >
              ✕
            </button>

            {/* Styled Inner Form */}
            <div className="p-1">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

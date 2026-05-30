"use client";

import React, { useState } from "react";
import { AtomLogo } from "./AtomLogo";
import { ContactForm } from "./ContactForm";
import { MailIcon } from "./MailIcon";

interface BentoOverviewProps {
  onSwitchToFullView: (sectionId?: string) => void;
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
      coreSentence: "Building high-performance Next.js systems and tactile responsive Flutter mobile apps.",
      tag: "Next.js · Flutter"
    },
    {
      id: 2,
      title: "SLA & Performance",
      coreSentence: "Continuous speed tuning, database query optimization, and secure backward-compatible code support.",
      tag: "Tuning · Support"
    },
    {
      id: 3,
      title: "Smart Delivery Systems",
      coreSentence: "Deploying automated pipelines, rigorous telemetry coverage, and 0% friction engineering workflows.",
      tag: "CI/CD · Automation"
    },
    {
      id: 4,
      title: "Developer Education",
      coreSentence: "Structured coding manuals and assessment criteria tailored for modern tech teams.",
      tag: "Curriculum · Labs"
    }
  ];

  const curriculumPoints = [
    { name: "Modern Engineering Workflows", info: "Git patterns + automated CI reviews" },
    { name: "Full-Stack Development", info: "Next.js App Router + Firebase DB" },
    { name: "Testing & Clean Architecture", info: "Unit testing + security rules" },
    { name: "Telemetry & Cloud Monitoring", info: "Error logs mapping + alerts setup" }
  ];

  return (
    <div className="w-full text-[#cbd5e1]">
      {/* Outer Grid Wrapper - Custom expanded size perfectly tailored for a 16-inch monitor overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto bento-grid-fluid">
        
        {/* CARD 1: Brand & Value Proposition (Hero representation) */}
        <div id="bento-card-hero" className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/80 p-5 sm:p-6 md:p-8 lg:p-4.5 xl:p-6 2xl:p-8 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-8 lg:row-span-2 h-full">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          
          <div className="relative space-y-3 sm:space-y-4 lg:space-y-1.5 xl:space-y-3.5 2xl:space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-900/40 bg-indigo-950/50 px-2.5 py-1 text-xs lg:text-[10px] xl:text-xs 2xl:text-sm text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              Product Engineering Studio
            </div>
            
            <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-[21px] xl:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Craft <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">experiences</span> that feel ahead of their time.
            </h2>
            
            <p className="max-w-3xl text-xs sm:text-sm lg:text-[11px] xl:text-[13px] 2xl:text-base leading-relaxed text-slate-300 font-normal">
              Himpower designs, develops, and maintains digital platforms—and writes practical education courses that teams actually use. We combine speed, UX elegance, and architectural security to keep products growing.
            </p>
          </div>

          <div className="relative mt-3 lg:mt-2 xl:mt-3.5 2xl:mt-4 flex flex-wrap gap-1.5 sm:gap-2.5 lg:gap-1.5 xl:gap-2 2xl:gap-2.5">
            {["Next.js Systems", "Mobile", "DB Optimization", "SRE Readiness", "Maintenance"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-800 bg-slate-900/70 px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs lg:px-2 lg:py-1 lg:text-[10px] xl:px-2.5 xl:py-1 xl:text-xs 2xl:px-3 2xl:py-1.5 2xl:text-xs font-semibold text-slate-300 shadow-inner whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 2: Central Dynamic Showcase Card (Atom Logo focus) */}
        <div id="bento-card-atom" className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-950/85 p-6 text-center shadow-2xl backdrop-blur-md md:col-span-1 lg:col-span-4 lg:row-span-2 h-full">
          <div className="pointer-events-none absolute inset-0 opacity-10 grid-overlay" />
          
          <div className="relative flex flex-col items-center justify-center">
            <AtomLogo size={125} className="transition-transform hover:scale-105 duration-500 max-h-[140px] max-w-[140px] lg:max-h-[110px] xl:max-h-[140px]" />
            <h3 className="mt-4 text-base font-bold text-white tracking-tight">Active Engine</h3>
            <p className="mt-1.5 max-w-[250px] text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm text-slate-300 leading-normal">
              Continuous delivery, clean telemetry, and modular standards running live.
            </p>
          </div>
        </div>

        {/* CARD 3: Unified Services Directory */}
        <div 
          id="bento-card-services" 
          onClick={() => onSwitchToFullView("services")}
          className="group relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/95 p-5 sm:p-7 lg:p-4.5 xl:p-6 2xl:p-7 shadow-2xl backdrop-blur-md md:col-span-1 lg:col-span-4 lg:row-span-3 h-full cursor-pointer hover:border-indigo-500/40 transition-all duration-300"
        >
          <div className="space-y-3.5 sm:space-y-4 lg:space-y-2.5 xl:space-y-3.5 2xl:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-indigo-400 tracking-widest uppercase">Services Catalog</div>
                <h3 className="mt-1 text-base sm:text-lg md:text-xl lg:text-[15px] xl:text-lg 2xl:text-xl font-bold text-white animate-fade-in">Core Capabilities</h3>
              </div>
              <span className="rounded-full bg-indigo-950/45 text-indigo-405 px-3 py-1 text-[11px] font-bold font-mono border border-indigo-900/30 group-hover:bg-indigo-900 group-hover:text-white transition duration-250">
                View All ↗
              </span>
            </div>

            <div className="space-y-2 sm:space-y-2.5 lg:space-y-1.5 xl:space-y-2.5 2xl:space-y-3">
              {services.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`rounded-2xl border p-3 sm:p-3.5 lg:p-2 xl:p-3 2xl:p-3.5 transition-all duration-200 ${
                    hoveredService === idx 
                      ? "border-indigo-500/50 bg-indigo-950/20 translate-x-1" 
                      : "border-slate-800/40 bg-slate-900/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[15px] font-bold text-white group-hover:text-indigo-300 transition duration-150">{item.title}</span>
                    <span className="text-[9px] sm:text-xs font-mono text-cyan-400">{item.tag.split(" ")[0]}</span>
                  </div>
                  <p className="mt-1 lg:mt-0.5 xl:mt-1 text-[11px] sm:text-xs lg:text-[10.5px] xl:text-[12px] 2xl:text-[13px] leading-relaxed text-slate-300">
                    {item.coreSentence}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 lg:pt-1.5 xl:pt-3 border-t border-slate-800 text-center text-xs text-slate-400 group-hover:text-slate-200 transition">
            Click any service above to read detailed reports
          </div>
        </div>

        {/* CARD 4: Step-by-Step Delivery Path */}
        <div id="bento-card-path" className="relative flex flex-col justify-between rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-5 sm:p-6 lg:p-4.5 xl:p-5 2xl:p-6 shadow-2xl backdrop-blur-md md:col-span-2 lg:col-span-5 lg:row-span-3 h-full">
          <div className="space-y-3.5 sm:space-y-4 lg:space-y-2.5 xl:space-y-3.5 2xl:space-y-4 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">Our Framework</div>
                <h3 className="mt-1 text-base sm:text-lg md:text-xl lg:text-[15px] xl:text-lg 2xl:text-xl font-bold text-white">Unified Delivery Pipeline (UDP)</h3>
              </div>
              <button 
                onClick={() => onSwitchToFullView("process")}
                className="rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-900/50 px-3 py-1 text-[11px] font-bold font-mono hover:bg-cyan-900 hover:text-white transition cursor-pointer"
              >
                View Details ↗
              </button>
            </div>

            {/* Horizontal Timeline Controls */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  type="button"
                  className={`relative rounded-xl border p-1.5 xs:p-2.5 sm:p-3 lg:p-1 xl:p-2.5 2xl:p-3 text-left transition duration-200 focus:outline-none ${
                    activeStep === idx
                      ? "border-cyan-500 bg-cyan-950/30 text-white shadow-lg"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] 2xl:text-[11px] font-bold font-mono text-indigo-400">{step.num}</div>
                  <div className="mt-1 lg:mt-0.5 xl:mt-1 text-[10px] sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-[13px] font-bold text-white leading-tight truncate">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Step Detail display area */}
            <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4 sm:p-5 lg:p-2.5 xl:p-4.5 2xl:p-5 flex flex-col justify-between flex-grow mt-2 lg:mt-1.5 xl:mt-2">
              <div className="space-y-1.5 lg:space-y-0.5 xl:space-y-1.5">
                <div className="text-[11px] sm:text-xs lg:text-[11px] xl:text-xs 2xl:text-[13px] font-bold text-white">Scope & Activity:</div>
                <p className="text-xs sm:text-sm lg:text-xs xl:text-[13px] 2xl:text-[14px] leading-relaxed text-slate-300">{steps[activeStep].desc}</p>
              </div>
              <div className="mt-2 pt-3 lg:pt-1.5 xl:pt-3 border-t border-slate-900/50 flex items-center justify-between gap-1 text-[11px] sm:text-xs">
                <span className="font-semibold text-[#06b6d4]">{steps[activeStep].tip}</span>
                <span className="font-mono text-slate-500 hidden sm:inline">Agile SRE</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Learning & Technical Labs */}
        <div 
          id="bento-card-labs" 
          onClick={() => onSwitchToFullView("education")}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-950/40 bg-slate-900/90 p-5 sm:p-6 lg:p-3 xl:p-4.5 2xl:p-6 shadow-2xl backdrop-blur-md md:col-span-1 lg:col-span-3 lg:row-span-2 h-full cursor-pointer hover:border-violet-500/40 transition-all duration-300"
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-1.5 xl:space-y-3 2xl:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-violet-400 tracking-widest uppercase font-sans">Instructional Lab</div>
                <h3 className="mt-0.5 text-base sm:text-lg lg:text-[13px] xl:text-[15px] 2xl:text-xl font-bold text-white font-sans">Custom Curriculum</h3>
              </div>
              <span className="rounded-full bg-violet-950/65 text-violet-400 border border-violet-900/40 px-3 py-1 text-[11px] lg:px-2 lg:py-0.5 lg:text-[9.5px] xl:px-2.5 xl:py-1 xl:text-xs 2xl:px-3 2xl:py-1 text-[11px] font-bold font-mono group-hover:bg-violet-900 group-hover:text-white transition duration-250">
                View Lab ↗
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2.5 lg:space-y-1 xl:space-y-2 flex-grow">
              {curriculumPoints.map((item, idx) => (
                <div key={idx} className="group rounded-xl bg-slate-950/45 p-2 sm:p-3 lg:py-1 lg:px-2.5 xl:p-2.5 2xl:p-3 border border-slate-800/50 hover:border-violet-950/80 transition duration-200">
                  <div className="text-xs sm:text-sm lg:text-[11px] xl:text-sm 2xl:text-[15px] font-bold text-white group-hover:text-violet-300 transition duration-150">{item.name}</div>
                  <div className="mt-0.5 lg:mt-0 xl:mt-0.5 text-[9px] sm:text-xs lg:text-[8px] xl:text-[10px] 2xl:text-xs text-slate-400 leading-none">{item.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 6: Interactive Prompt Brief modal launcher (Replaces massive scolling form coordinates) */}
        <div
          id="bento-card-contact"
          onClick={() => setIsContactModalOpen(true)}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900/60 p-4 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-950/20 active:scale-[0.98] flex items-center justify-between col-span-1 md:col-span-1 lg:col-span-3 lg:row-span-1 h-full"
        >
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:scale-125" />
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-transform group-hover:scale-105 duration-300">
              <MailIcon className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                Let&apos;s build together
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </h4>
              <p className="text-xs text-slate-400">Send us a project brief</p>
            </div>
          </div>
          
          <span className="rounded-full bg-indigo-600/20 group-hover:bg-indigo-650 border border-indigo-500/30 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 shadow-sm whitespace-nowrap">
            Start Brief
          </span>
        </div>

      </div>

      {/* Switching bottom inline container - slim and high-density */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-900/90 bg-slate-950/40 px-6 py-4 text-center sm:text-left">
        <div className="space-y-0.5">
          <h4 className="text-sm sm:text-base font-semibold text-white">Looking for the original scrolling view with detailed reports?</h4>
          <p className="text-xs sm:text-sm text-slate-400">Switch to the traditional vertical presentation format anywhere at your convenience.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setShowAdminConsole((prev) => !prev)}
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              showAdminConsole
                ? "bg-violet-900/30 border border-violet-800 text-violet-300"
                : "border border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-400"
            }`}
          >
            {showAdminConsole ? "🔒 Hide Console" : "🔑 Admin Console"}
          </button>
          <button
            onClick={() => onSwitchToFullView()}
            type="button"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-bold text-white transition shadow-md shadow-indigo-600/10 shrink-0 cursor-pointer"
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

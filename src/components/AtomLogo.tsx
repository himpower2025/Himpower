"use client";

import { useEffect, useRef } from "react";

interface AtomLogoProps {
  className?: string;
  size?: number;
}

export function AtomLogo({ className = "", size = 56 }: AtomLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Add subtle continuous glow pulse via JS for the nucleus
    const svg = svgRef.current;
    if (!svg) return;

    let frame: number;
    let t = 0;

    const tick = () => {
      t += 0.03;
      const pulse = 0.7 + 0.3 * Math.sin(t);
      const nucleus = svg.querySelector<SVGElement>("#atom-nucleus-glow");
      if (nucleus) nucleus.style.opacity = String(pulse);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Himpower logo"
    >
      <defs>
        {/* === Gradients === */}
        <linearGradient id="orbit1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="orbit2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="orbit3Grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.85" />
        </linearGradient>

        <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="electronGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>

        {/* === Glow filters === */}
        <filter id="glowStrong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowNucleus" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === Orbital rings === */}

      {/* Orbit 1 Group: horizontal ellipse + rotating system */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="8s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="17"
          stroke="url(#orbit1Grad)"
          strokeWidth="2"
          filter="url(#glowSoft)"
        />
        {/* Electron 1: rides orbit 1 */}
        <circle cx="50" cy="50" r="4.5" fill="url(#electronGrad)" filter="url(#glowStrong)">
          <animateMotion dur="8s" repeatCount="indefinite">
            <mpath href="#path-orbit1" />
          </animateMotion>
        </circle>
      </g>

      {/* Orbit 2 Group: 60° tilted and rotating system */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="60 50 50"
          to="420 50 50"
          dur="10s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="17"
          stroke="url(#orbit2Grad)"
          strokeWidth="2"
          filter="url(#glowSoft)"
        />
        {/* Electron 2: rides orbit 2 */}
        <circle cx="50" cy="50" r="4.2" fill="url(#electronGrad)" filter="url(#glowStrong)">
          <animateMotion dur="10s" repeatCount="indefinite" begin="-3.3s">
            <mpath href="#path-orbit2" />
          </animateMotion>
        </circle>
      </g>

      {/* Orbit 3 Group: -60° tilted and rotating system */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-60 50 50"
          to="300 50 50"
          dur="12s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="17"
          stroke="url(#orbit3Grad)"
          strokeWidth="2"
          filter="url(#glowSoft)"
        />
        {/* Electron 3: rides orbit 3 */}
        <circle cx="50" cy="50" r="4.5" fill="url(#electronGrad)" filter="url(#glowStrong)">
          <animateMotion dur="12s" repeatCount="indefinite" begin="-4s">
            <mpath href="#path-orbit3" />
          </animateMotion>
        </circle>
      </g>

      {/* === Nucleus glow halo (pulsing via JS) === */}
      <circle
        id="atom-nucleus-glow"
        cx="50"
        cy="50"
        r="14"
        fill="url(#nucleusGrad)"
        filter="url(#glowNucleus)"
        style={{ opacity: 0.85 }}
      />

      {/* Nucleus core */}
      <circle
        cx="50"
        cy="50"
        r="5"
        fill="white"
        filter="url(#glowStrong)"
        opacity="0.95"
      />

      {/* === Hidden motion paths for electrons (relative to rotating parent group coordinates) === */}
      <defs>
        <path id="path-orbit1" d="M 94,50 A 44,17 0 1 1 93.99,49.99" />
        <path id="path-orbit2" d="M 94,50 A 44,17 0 1 1 93.99,49.99" />
        <path id="path-orbit3" d="M 94,50 A 44,17 0 1 1 93.99,49.99" />
      </defs>
    </svg>
  );
}

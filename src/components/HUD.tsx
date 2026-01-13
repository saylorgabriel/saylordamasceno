"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HUDProps {
  fps: number;
  particleCount: number;
  currentSection?: number;
  totalSections?: number;
}

export function HUD({ fps, particleCount, currentSection = 0, totalSections = 1 }: HUDProps) {
  const [status, setStatus] = useState("INITIALIZING");

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("CONNECTING"), 800);
    const timer2 = setTimeout(() => setStatus("ONLINE"), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {/* Top Left - Professional Identity */}
      <motion.div
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      >
        <div className="space-y-2 md:space-y-4">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${
                status === "ONLINE" ? "bg-emerald-400" : "bg-amber-400"
              }`}
              animate={status === "ONLINE" ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className={`text-[10px] tracking-[0.2em] uppercase ${
              status === "ONLINE" ? "text-white/50" : "text-white/30"
            }`}>
              {status}
            </span>
          </div>

          {/* Role & Company */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="space-y-1"
          >
            <div className="text-[11px] tracking-[0.15em] text-white/40">
              Tech Lead
            </div>
            <div className="text-[10px] tracking-[0.1em] text-white/25">
              @ Consolide
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex items-center gap-2"
          >
            <svg className="w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[10px] tracking-[0.1em] text-white/20">
              Campinas, SP, Brazil
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-12 h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="text-[9px] tracking-[0.15em] text-emerald-400/60 uppercase">
              Open to Projects
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Top Right - Contact Panel */}
      <motion.div
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
      >
        <div className="text-right space-y-2 md:space-y-4">
          {/* Contact Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-[9px] tracking-[0.4em] text-white/30 uppercase"
          >
            Contact
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="space-y-3"
          >
            <ContactLink
              href="https://www.linkedin.com/in/saylordamasceno/"
              label="in/saylordamasceno"
              icon={<LinkedInIcon />}
            />
            <ContactLink
              href="https://github.com/saylorgabriel"
              label="saylorgabriel"
              icon={<GitHubIcon />}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Left - Section Indicator */}
      <motion.div
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
      >
        <div className="space-y-2">
          <div className="text-[10px] tracking-[0.2em] text-white/20 font-light">
            {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
          </div>
          {/* Progress bar */}
          <div className="w-16 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Right - Credentials */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 text-right"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
      >
        <div className="space-y-2 md:space-y-3">
          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]"
          >
            <span className="text-[11px] tracking-[0.1em] text-white/50 font-light">
              15+ Years Experience
            </span>
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-[9px] tracking-[0.15em] text-white/25"
          >
            PHP • AI/LLMs • Cloud
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-12 h-px bg-white/10 ml-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            style={{ transformOrigin: 'right' }}
          />

          {/* Download CV Link */}
          <motion.a
            href="/cv-saylor-damasceno.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-all duration-300 cursor-none group"
            whileHover={{ x: -3 }}
          >
            <span>Download CV</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}

// Contact Link Component
function ContactLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-end gap-2 text-[10px] tracking-[0.1em] text-white/35 hover:text-white/70 transition-all duration-300 cursor-none md:cursor-none cursor-pointer group py-1"
      whileHover={{ x: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="transition-all duration-300">{label}</span>
      <span className="text-white/20 group-hover:text-white/50 transition-colors duration-300">
        {icon}
      </span>
    </motion.a>
  );
}

// Icons
function LinkedInIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

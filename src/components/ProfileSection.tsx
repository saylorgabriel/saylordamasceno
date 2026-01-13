"use client";

import { motion } from "framer-motion";

const profileData = {
  summary: "Tech Lead and Senior Software Engineer with 15+ years of experience. Specialist in back-end development, software architecture, and AI/LLMs. Currently leading engineering teams at Consolide, Brazil's largest trademark registration company.",

  experience: [
    {
      company: "Consolide",
      period: "2021 - Present",
      role: "Tech Lead",
      highlights: ["Engineering Leadership", "AI Implementation", "Scalable Solutions"]
    },
    {
      company: "Superlógica",
      period: "2007 - 2021",
      role: "13+ years",
      highlights: ["Tech Lead", "Product Manager", "Systems Analyst"]
    }
  ],

  skills: {
    "Languages": ["PHP", "Python", "TypeScript", "Node.js", "SQL"],
    "AI/ML": ["LangChain", "OpenAI", "RAG", "Vector DBs", "Embeddings"],
    "Cloud": ["AWS", "Azure", "Docker", "Serverless"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis"]
  },

  certifications: [
    "Security Engineering on AWS",
    "IBM Blockchain Developer",
    "Strategic Thinking"
  ],

  education: [
    "Blockchain & Digital Finance - UNINTER",
    "Systems Analysis - UNIP"
  ]
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export function ProfileSection() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 py-20 overflow-y-auto max-h-screen scrollbar-hide">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white/80 uppercase">
            Profile
          </h1>
          <div className="w-16 h-px bg-emerald-500/50 mx-auto mt-4" />
        </motion.div>

        {/* Summary Card */}
        <motion.div
          className="mb-6 p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Summary</h2>
          <p className="text-[13px] leading-relaxed text-white/50 font-light">
            {profileData.summary}
          </p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          className="mb-6 p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-4">Experience</h2>
          <div className="space-y-4">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div>
                  <h3 className="text-[12px] text-white/60 font-medium">{exp.company}</h3>
                  <p className="text-[10px] text-white/30">{exp.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h, i) => (
                    <span key={i} className="text-[9px] px-2 py-1 rounded-full bg-white/5 text-white/40">
                      {h}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-white/25">{exp.period}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div
          className="mb-6 p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(profileData.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{category}</h3>
                <div className="space-y-1">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-[11px] text-white/50 font-light">{skill}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Certifications */}
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Certifications</h2>
            <div className="space-y-2">
              {profileData.certifications.map((cert, i) => (
                <div key={i} className="text-[11px] text-white/50 font-light flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Education</h2>
            <div className="space-y-2">
              {profileData.education.map((edu, i) => (
                <div key={i} className="text-[11px] text-white/50 font-light flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                  {edu}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center pt-4"
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-4">
            <a
              href="https://linkedin.com/in/saylordamasceno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
            >
              LinkedIn
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://github.com/saylorgabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

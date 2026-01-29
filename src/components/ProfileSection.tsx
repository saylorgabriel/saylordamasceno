"use client";

import { motion } from "framer-motion";

const profileData = {
  summary: "Tech Lead and Senior Software Engineer with 15+ years of experience. Specialist in back-end development, software architecture, and AI/LLMs. Currently leading engineering teams at Consolide, Brazil's largest trademark registration company.",

  experience: [
    {
      company: "Otrix Labs",
      period: "2025 - Present",
      role: "Founder & CTO",
      highlights: ["AI Innovation", "Product Strategy", "Technical Leadership"]
    },
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

  projects: [
    {
      name: "Atlas Copilot",
      role: "Founder & CTO",
      description: "IA que organiza o caos do WhatsApp. Resumos, busca inteligente e tarefas extraídas automaticamente das conversas."
    },
    {
      name: "QueroDocumento",
      role: "Arquiteto de Software",
      description: "Consulta de protestos e certidões em cartórios de todo o Brasil. Processo 100% digital."
    },
    {
      name: "PollingData",
      role: "Consultor Técnico",
      description: "Intelligence dashboard para análise de dados e pesquisas de mercado. Insights estratégicos através de visualizações avançadas."
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

// Floating animation with different durations for organic feel
const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2
    }
  })
};

// Card component with hover and floating effects
function FloatingCard({
  children,
  index,
  className = ""
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        custom={index}
        animate="animate"
        variants={floatingVariants}
        whileHover={{
          scale: 1.02,
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className={`p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm
          hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-emerald-500/5
          transition-colors duration-300 cursor-default ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

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
          <motion.h1
            className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white/80 uppercase"
            animate={{
              textShadow: [
                "0 0 20px rgba(16, 185, 129, 0)",
                "0 0 20px rgba(16, 185, 129, 0.3)",
                "0 0 20px rgba(16, 185, 129, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Profile
          </motion.h1>
          <motion.div
            className="w-16 h-px bg-emerald-500/50 mx-auto mt-4"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Summary Card */}
        <div className="mb-6">
          <FloatingCard index={0}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Summary</h2>
            <p className="text-[13px] leading-relaxed text-white/50 font-light">
              {profileData.summary}
            </p>
          </FloatingCard>
        </div>

        {/* Experience Card */}
        <div className="mb-6">
          <FloatingCard index={1}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-4">Experience</h2>
            <div className="space-y-4">
              {profileData.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h3 className="text-[12px] text-white/60 font-medium">{exp.company}</h3>
                    <p className="text-[10px] text-white/30">{exp.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h, i) => (
                      <motion.span
                        key={i}
                        className="text-[9px] px-2 py-1 rounded-full bg-white/5 text-white/40 hover:bg-emerald-500/20 hover:text-emerald-300/70 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/25">{exp.period}</span>
                </motion.div>
              ))}
            </div>
          </FloatingCard>
        </div>

        {/* Projects Card */}
        <div className="mb-6">
          <FloatingCard index={1.5}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-4">Featured Projects</h2>
            <div className="space-y-4">
              {profileData.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col gap-2 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-[12px] text-white/60 font-medium">{project.name}</h3>
                      <p className="text-[10px] text-white/30">{project.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/40 font-light leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </FloatingCard>
        </div>

        {/* Skills Card */}
        <div className="mb-6">
          <FloatingCard index={2}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-4">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profileData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{category}</h3>
                  <div className="space-y-1">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        className="text-[11px] text-white/50 font-light hover:text-emerald-400/70 transition-colors cursor-default"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Certifications */}
          <FloatingCard index={3}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Certifications</h2>
            <div className="space-y-2">
              {profileData.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="text-[11px] text-white/50 font-light flex items-center gap-2 hover:text-white/70 transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="w-1 h-1 rounded-full bg-emerald-500/50"
                    whileHover={{ scale: 2, backgroundColor: "rgba(16, 185, 129, 0.8)" }}
                  />
                  {cert}
                </motion.div>
              ))}
            </div>
          </FloatingCard>

          {/* Education */}
          <FloatingCard index={4}>
            <h2 className="text-[10px] tracking-[0.3em] text-emerald-400/70 uppercase mb-3">Education</h2>
            <div className="space-y-2">
              {profileData.education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="text-[11px] text-white/50 font-light flex items-center gap-2 hover:text-white/70 transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="w-1 h-1 rounded-full bg-emerald-500/50"
                    whileHover={{ scale: 2, backgroundColor: "rgba(16, 185, 129, 0.8)" }}
                  />
                  {edu}
                </motion.div>
              ))}
            </div>
          </FloatingCard>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center pt-4"
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-4">
            <motion.a
              href="https://linkedin.com/in/saylordamasceno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              LinkedIn
            </motion.a>
            <span className="text-white/20">•</span>
            <motion.a
              href="https://github.com/saylorgabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              GitHub
            </motion.a>
            <span className="text-white/20">•</span>
            <motion.a
              href="http://atlascopilot.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Atlas
            </motion.a>
            <span className="text-white/20">•</span>
            <motion.a
              href="https://otrixlabs.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-white/40 hover:text-emerald-400/70 transition-colors uppercase"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Otrix Labs
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

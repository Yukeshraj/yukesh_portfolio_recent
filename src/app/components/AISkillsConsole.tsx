import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Code, Server, Database, Cloud, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

const skills = [
  {
    category: "Frontend",
    icon: <Code size={20} />,
    items: ["React", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend",
    icon: <Server size={20} />,
    items: ["Node.js", ".NET Core", "ASP.NET MVC", "C#", "Java", "Python", "REST APIs", "GraphQL"]
  },
  {
    category: "Database",
    icon: <Database size={20} />,
    items: ["PostgreSQL", "MySQL", "Firebase", "Firestore", "MongoDB", "Redis"]
  },
  {
    category: "Cloud & DevOps",
    icon: <Cloud size={20} />,
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Nginx", "Terraform"]
  }
];

export function AISkillsConsole() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-[#10A37F]/10 rounded-lg text-[#10A37F]">
          <Terminal size={24} />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Technical Expertise
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827] transition-all duration-300",
              openIndex === index ? "ring-1 ring-[#10A37F]/50 shadow-[0_0_30px_-10px_rgba(16,163,127,0.3)]" : "hover:border-[#374151]"
            )}
            onClick={() => setOpenIndex(index === openIndex ? null : index)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <button className="w-full flex items-center justify-between p-5 text-left">
              <div className="flex items-center gap-3 text-gray-200">
                <span className={cn("transition-colors", openIndex === index ? "text-[#10A37F]" : "text-gray-400")}>
                  {skill.icon}
                </span>
                <span className="font-medium text-lg tracking-tight">{skill.category}</span>
              </div>
              <ChevronDown 
                size={20} 
                className={cn(
                  "text-gray-500 transition-transform duration-300",
                  openIndex === index ? "rotate-180 text-[#10A37F]" : ""
                )} 
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="w-full h-px bg-[#1F2937] mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-xs font-mono text-[#10A37F] bg-[#10A37F]/10 border border-[#10A37F]/20 rounded-md hover:bg-[#10A37F]/20 transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

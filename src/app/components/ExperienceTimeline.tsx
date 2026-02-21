import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Building2, Terminal } from 'lucide-react';

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "TechFlow Systems",
    period: "2023 - Present",
    description: [
      "Architected microservices-based backend for high-traffic SaaS platform serving 50k+ users.",
      "Led migration from monolithic architecture to Kubernetes-orchestrated containers.",
      "Mentored junior developers and established code quality standards."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "Skyline Coach Travels",
    period: "2021 - 2023",
    description: [
      "Built scalable fleet management systems reducing operational costs by 15%.",
      "Implemented DevOps pipelines using GitHub Actions and AWS CodePipeline.",
      "Improved application performance by optimising database queries and caching strategies."
    ]
  },
  {
    role: "Junior Web Developer",
    company: "Creative Solutions Inc.",
    period: "2019 - 2021",
    description: [
      "Developed responsive front-end interfaces using React and Redux.",
      "Collaborated with UX/UI designers to implement pixel-perfect designs.",
      "Integrated third-party APIs for payment processing and geolocation services."
    ]
  }
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-[#10A37F]/10 rounded-lg text-[#10A37F]">
          <Briefcase size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Professional History</h2>
      </div>

      <div className="space-y-8 relative">
        {/* Connection Line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#1F2937] -z-10" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center shrink-0 z-10 shadow-sm shadow-[#10A37F]/20">
                <div className="w-2 h-2 rounded-full bg-[#10A37F]" />
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl rounded-tl-sm p-6 shadow-sm hover:border-[#10A37F]/30 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#10A37F] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Building2 size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#10A37F] bg-[#10A37F]/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Code2, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: "NeuroFinance Dashboard",
    summary: "Real-time financial analytics platform powered by machine learning algorithms for predictive market trends.",
    tech: ["React", "Python", "TensorFlow", "AWS"],
    image: "https://images.unsplash.com/photo-1764258057604-94e8e6ca092f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmslMjBtb2RlfGVufDF8fHx8MTc3MTU5ODEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#",
    github: "#"
  },
  {
    title: "CloudSentinel",
    summary: "Automated cloud infrastructure monitoring and security compliance tool for enterprise DevOps teams.",
    tech: ["Go", "Kubernetes", "Docker", "Prometheus"],
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwY2xvdWQlMjBjb21wdXRpbmd8ZW58MXx8fHwxNzcxNTk4MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#",
    github: "#"
  },
  {
    title: "SynthAI API Gateway",
    summary: "High-performance API gateway with integrated rate limiting, caching, and AI-driven threat detection.",
    tech: ["Node.js", "Redis", "GraphQL", "Kong"],
    image: "https://images.unsplash.com/photo-1623305466040-b753da413c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWxpc3RpYyUyMHNvZnR3YXJlJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwxfHx8fDE3NzE1OTgxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#",
    github: "#"
  }
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#10A37F]">
            <Code2 size={20} />
            <span className="text-sm font-mono tracking-wider uppercase">Portfolio Index</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm md:text-base">
          Selected works showcasing complex system architecture and full-stack engineering capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-[#111827] rounded-xl overflow-hidden border border-[#1F2937] hover:border-[#10A37F]/50 transition-colors shadow-lg hover:shadow-[#10A37F]/10 flex flex-col"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-[#0D1117]/20 group-hover:bg-transparent transition-colors z-10" />
              <ImageWithFallback 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#10A37F] transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={project.link} className="text-gray-400 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-gray-300 bg-[#1F2937] rounded border border-[#374151]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 pt-4 border-t border-[#1F2937] flex items-center text-[#10A37F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span>View Case Study</span>
                <ArrowUpRight size={16} className="ml-1" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

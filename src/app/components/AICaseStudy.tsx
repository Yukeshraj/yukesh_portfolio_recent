import React from 'react';
import { motion } from 'motion/react';
import { Network, Database, Layers, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AICaseStudy() {
  return (
    <section className="py-24 px-4 bg-[#0D1117] border-y border-[#1F2937]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 text-[#10A37F]">
              <Network size={24} />
              <span className="text-sm font-mono tracking-wider uppercase">Architecture Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How I Architect Systems
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Designing for scale involves more than just writing code. It requires understanding trade-offs, anticipating bottlenecks, and building resilience into every layer of the stack.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: <Database size={20} />,
                title: "Problem Statement",
                desc: "High latency in transaction processing during peak loads causing 15% user drop-off."
              },
              {
                icon: <Layers size={20} />,
                title: "Architectural Solution",
                desc: "Implemented event-driven microservices with Kafka for asynchronous processing and Redis caching layer."
              },
              {
                icon: <ArrowRight size={20} />,
                title: "Measurable Impact",
                desc: "Reduced latency by 85%, handled 10x traffic spike with zero downtime, and improved data consistency."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-lg bg-[#111827] border border-[#1F2937] hover:border-[#10A37F]/30 transition-colors"
              >
                <div className="shrink-0 mt-1 text-[#10A37F] bg-[#10A37F]/10 p-2 rounded-md h-fit">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#10A37F]/20 to-transparent blur-2xl rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative rounded-2xl overflow-hidden border border-[#1F2937] shadow-2xl bg-[#111827]">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#1F2937] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="pt-8 p-1">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1623305466040-b753da413c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWxpc3RpYyUyMHNvZnR3YXJlJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwxfHx8fDE3NzE1OTgxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="System Architecture Diagram"
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E5E7EB] font-sans overflow-x-hidden selection:bg-[#10A37F] selection:text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F2937]/20 via-[#0D1117]/0 to-[#0D1117]/0 z-0" />
      
      {/* Navbar / Status Bar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#1F2937]"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10A37F] animate-pulse" />
          <span className="text-sm font-medium text-[#E5E7EB]/80 font-mono">System Online</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#E5E7EB]/60">
          <a href="#projects" className="hover:text-[#10A37F] transition-colors">Projects</a>
          <a href="#skills" className="hover:text-[#10A37F] transition-colors">Skills</a>
          <a href="#experience" className="hover:text-[#10A37F] transition-colors">Experience</a>
          <a href="#contact" className="hover:text-[#10A37F] transition-colors">Contact</a>
        </nav>
      </motion.header>

      <main className="relative z-10 pt-20">
        {children}
      </main>

      <footer className="relative z-10 py-8 text-center text-xs text-[#E5E7EB]/40 border-t border-[#1F2937] mt-20">
        <p>© 2026 Yukesh Vinayagan. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

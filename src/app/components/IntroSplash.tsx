import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Zap, Layers, Rocket, CheckCircle, Lightbulb, Globe } from 'lucide-react';

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    { 
      text: "Great ideas deserve world-class execution.", 
      subtext: "INITIATING CREATIVE ENGINE",
      icon: <Lightbulb size={32} className="text-yellow-400" />, 
      duration: 2500 
    },
    { 
      text: "I build scalable systems that drive growth.", 
      subtext: "LOADING ARCHITECTURE MODULES",
      icon: <Layers size={32} className="text-blue-400" />, 
      duration: 2500 
    },
    { 
      text: "Turning complex problems into elegant code.", 
      subtext: "OPTIMIZING PERFORMANCE",
      icon: <Cpu size={32} className="text-purple-400" />, 
      duration: 2500 
    },
    { 
      text: "Ready to see what's possible?", 
      subtext: "ESTABLISHING CONNECTION",
      icon: <Rocket size={32} className="text-red-400" />, 
      duration: 2000 
    },
    { 
      text: "Welcome to Yukesh Vinayagan's Portfolio.", 
      subtext: "SYSTEM ONLINE",
      icon: <CheckCircle size={32} className="text-green-500" />, 
      duration: 2000 
    },
  ];

  useEffect(() => {
    const runSequence = async () => {
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      }
      onComplete();
    };

    runSequence();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-[#0D1117] text-[#ECECEC] font-sans flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1F2937]/40 via-[#0D1117]/80 to-[#0D1117] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(13,17,23,0.9)_2px,transparent_2px),linear-gradient(90deg,rgba(13,17,23,0.9)_2px,transparent_2px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-2xl px-8 relative z-10 flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-8"
          >
            <div className="relative group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-white/10"
              />
              <motion.div
                animate={{ rotate: -180 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-white/5"
              />
              <div className="w-20 h-20 bg-[#161b22] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {steps[step].icon}
              </div>
            </div>

            <div className="space-y-4 max-w-lg">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {steps[step].text}
              </h2>
              <p className="text-sm font-mono text-green-500/80 tracking-widest uppercase">
                {">_ "}{steps[step].subtext}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 w-64 h-1 bg-[#1F2937] rounded-full overflow-hidden relative">
           <motion.div 
             key={`progress-${step}`}
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: steps[step].duration / 1000, ease: "linear" }}
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-400"
           />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center text-[10px] text-gray-500 font-mono">
        <p>SECURE CONNECTION ESTABLISHED</p>
        <p className="mt-1">© 2026 YUKESH VINAYAGAN</p>
      </div>
    </motion.div>
  );
}

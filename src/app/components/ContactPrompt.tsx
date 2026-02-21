import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Calendar, Sparkles } from 'lucide-react';

export function ContactPrompt() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send a message
    console.log('Sending message:', inputValue);
    setInputValue('');
  };

  return (
    <section id="contact" className="py-32 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10A37F]/10 text-[#10A37F] text-xs font-mono mb-4">
          <Sparkles size={14} />
          <span>Ready to Collaborate</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          Have a project in mind?
        </h2>
        
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Let's build something intelligent together.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mt-12 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#10A37F]/50 via-[#10A37F]/20 to-[#10A37F]/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          
          <div className="relative bg-[#111827] rounded-2xl p-2 border border-[#1F2937] shadow-2xl flex flex-col md:flex-row gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your project idea here..."
              className="flex-1 w-full bg-transparent border-none text-gray-200 placeholder-gray-500 px-4 py-3 focus:ring-0 text-base md:text-lg"
            />
            
            <div className="flex gap-2 w-full md:w-auto p-2 md:p-0">
              <button
                type="button"
                className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-gray-300 rounded-lg text-sm font-medium transition-colors border border-[#374151]"
              >
                <Calendar size={16} />
                <span className="hidden md:inline">Schedule</span>
              </button>
              
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex-1 md:flex-none items-center justify-center gap-2 px-6 py-2 bg-[#10A37F] hover:bg-[#0E8C6D] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-[#10A37F]/20 hover:shadow-[#10A37F]/40"
              >
                <span>Send</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center gap-6 mt-12 text-sm text-gray-500">
          <a href="#" className="hover:text-[#10A37F] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#10A37F] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[#10A37F] transition-colors">Twitter</a>
          <a href="mailto:hello@example.com" className="hover:text-[#10A37F] transition-colors">Email</a>
        </div>
      </motion.div>
    </section>
  );
}

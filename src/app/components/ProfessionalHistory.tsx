import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface HistoryItem {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

const historyData: HistoryItem[] = [
  {
    role: "Senior Software Engineer",
    company: "TechFlow Systems",
    period: "2023 - Present",
    achievements: [
      "Architected microservices-based backend for high-traffic SaaS platform serving 50k+ users.",
      "Led migration from monolithic architecture to Kubernetes-orchestrated containers.",
      "Mentored junior developers and established code quality standards."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "Skyline Coach Travels",
    period: "2021 - 2023",
    achievements: [
      "Built scalable fleet management systems reducing operational costs by 15%.",
      "Implemented DevOps pipelines using GitHub Actions and AWS CodePipeline.",
      "Improved application performance by optimizing database queries and caching strategies."
    ]
  }
];

export function ProfessionalHistory({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="w-full mt-2 mb-2">
      <div className="flex items-center gap-3 mb-6">
         <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#10A37F]/10' : 'bg-green-100'}`}>
            <Briefcase size={20} className={`${isDarkMode ? 'text-[#10A37F]' : 'text-green-600'}`} />
         </div>
         <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
           Professional History
         </h3>
      </div>

      <div className={`relative pl-4 border-l ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} space-y-8 ml-3`}>
        {historyData.map((item, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 ${isDarkMode ? 'bg-[#0D1117] border-[#10A37F]' : 'bg-white border-green-600'}`} />
            
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] duration-300 ${isDarkMode ? 'bg-[#161b22] border-gray-800 shadow-lg shadow-black/20' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
               <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                 <div>
                    <h4 className={`text-lg font-bold inline-block relative z-10 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                      {item.role}
                      <span className={`absolute bottom-1 left-0 w-full h-2 -z-10 opacity-30 ${isDarkMode ? 'bg-green-900' : 'bg-green-200'}`}></span>
                    </h4>
                    <div className={`flex items-center gap-2 mt-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       <Briefcase size={14} className="opacity-70" />
                       <span>{item.company}</span>
                    </div>
                 </div>
                 <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border shrink-0 inline-flex self-start ${isDarkMode ? 'bg-[#0D1117] border-[#10A37F] text-[#10A37F]' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    <div className="flex items-center gap-1.5">
                       <Calendar size={12} />
                       {item.period}
                    </div>
                 </div>
               </div>

               <ul className={`space-y-3 text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.achievements.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                      <span>{point}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

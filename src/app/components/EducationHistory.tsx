import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

const educationData: EducationItem[] = [
  {
    degree: "Post Graduate in Mobile Application Development",
    institution: "Tech University",
    period: "2019 - 2020",
    details: ["Specialized in iOS and Android ecosystem", "Built 5+ production-ready apps"]
  },
  {
    degree: "Post Graduate in Information System Business Analysis",
    institution: "Global Institute of Tech",
    period: "2018 - 2019",
    details: ["Focus on Agile methodologies & Requirement gathering", "Systems Architecture Analysis"]
  },
  {
    degree: "Master in Computer Application (MCA)",
    institution: "National College of Engineering",
    period: "2016 - 2018",
    details: ["Advanced Algorithms & Data Structures", "Cloud Computing Thesis"]
  },
  {
    degree: "Bachelor in Computer Science (B.Sc)",
    institution: "City Arts & Science College",
    period: "2013 - 2016",
    details: ["Foundation in C++, Java, and Web Technologies", "Graduated with Distinction"]
  }
];

export function EducationHistory({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="w-full mt-2 mb-2">
      <div className="flex items-center gap-3 mb-6">
         <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#D946EF]/10' : 'bg-pink-100'}`}>
            <GraduationCap size={20} className={`${isDarkMode ? 'text-[#D946EF]' : 'text-pink-600'}`} />
         </div>
         <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
           Education & Certifications
         </h3>
      </div>

      <div className={`relative pl-4 border-l ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} space-y-6 ml-3`}>
        {educationData.map((item, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 ${isDarkMode ? 'bg-[#0D1117] border-[#D946EF]' : 'bg-white border-pink-600'}`} />
            
            <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] duration-300 ${isDarkMode ? 'bg-[#161b22] border-gray-800 shadow-lg shadow-black/20' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
               <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                 <div>
                    <h4 className={`text-lg font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-700'}`}>
                      {item.degree}
                    </h4>
                    <div className={`flex items-center gap-2 mt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       <Award size={14} className="opacity-70" />
                       <span>{item.institution}</span>
                    </div>
                 </div>
                 <div className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 inline-flex self-start ${isDarkMode ? 'bg-[#0D1117] border-[#D946EF] text-[#D946EF]' : 'bg-pink-50 text-pink-700 border-pink-200'}`}>
                    <div className="flex items-center gap-1.5">
                       <Calendar size={12} />
                       {item.period}
                    </div>
                 </div>
               </div>

               <ul className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.details.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
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

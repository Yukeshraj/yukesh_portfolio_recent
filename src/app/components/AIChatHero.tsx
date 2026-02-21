import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, ChevronDown, Paperclip, Bot, Mic, Sparkles, 
  Code, Briefcase, FolderGit2, Mail, DollarSign, Clock, MapPin,
  PanelLeftClose, PanelLeftOpen, Plus, Search, MessageSquare,
  LayoutGrid, Terminal, Cpu, UserCircle, History, ExternalLink,
  Sun, Moon, GraduationCap, Calendar, FileText,
  Copy, ThumbsUp, ThumbsDown, RotateCw, MoreHorizontal, Upload,
  Database, Activity, Shield, Truck, Map, BarChart, Monitor
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Official ChatGPT Logo from reliable CDN
const chatGPTIcon = "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg";

// Knowledge Base
const RESUME_DATA = {
  skills: "My technical expertise spans full-stack development. \n\n💻 **Frontend:** ⚛️ React, 🅰️ Angular, 📘 TypeScript, 🌬️ Tailwind CSS, ▲ Next.js\n⚙️ **Backend:** 🟢 Node.js, 🟣 .NET Core, 🐍 Python, 🌐 REST APIs, ⚡ GraphQL\n🗄️ **Database:** 🐘 PostgreSQL, 🐬 MySQL, 🔥 Firebase, 🍃 MongoDB\n☁️ **Cloud & DevOps:** ☁️ AWS, 🐳 Docker, ☸️ Kubernetes, 🚀 CI/CD pipelines",
  experience: "My professional journey has been focused on architecting scalable systems and driving technical innovation.\n\n**Lead Software Engineer / Technical Consultant**\n**Skyway Coachlines**, Markham, Ontario | 05/2025 – Present\n\nI currently architect and develop a **microservice-based platform** by decomposing a legacy monolithic system, significantly improving **scalability**, deployment speed, and reliability. My key contributions include:\n• **Backend Architecture**: Created modular, secure APIs using **TypeScript** and **Node.js** for high-volume transactions.\n• **Frontend Leadership**: Built intuitive interfaces with **React**, **Next.js**, and **Vue.js** for internal and operational users.\n• **Data Engineering**: Designed **ETL pipelines** to migrate on-premise **MySQL** data to **Google Cloud SQL**, **Amazon S3**, and **Redshift**, with automated validation.\n• **Cloud & DevOps**: Developed cloud-native workflows for real-time reporting and supported **CI/CD pipelines** for stable releases.\n• **Data Governance**: Created metadata and lineage using **Informatica IDMC** for domains like Vehicles, Work Orders, and Breakdowns.\n• **Leadership**: Led end-to-end development from requirements to production, collaborating with product and business teams.\n\n**Software Engineer**\n**RCI Digital Solutions**, Chennai, India | 02/2021 – 02/2023\n\nPreviously, I built scalable backend systems for government transportation projects (Highway & Railway). My impact included:\n• **System Development**: Managed the full **SDLC** in Agile environments, reducing defects and improving stability.\n• **Cloud Integration**: Integrated **AWS** and **Azure** services for secure data pipelines and scalable infrastructure.\n• **Automation**: Architected workflow automation with **Zoho Creator** and notification systems using **Amazon SES**.\n• **Analytics**: Built data extraction and reporting solutions using **SQL**, **Tableau**, and **Zoho Analytics** for executive decision-making.\n• **Reliability**: Provided production support and optimized backend performance.",
  projects: "[PROJECTS]\nIDMC Data Governance Center|https://idmc-informatica-data-governance-da-three.vercel.app/|Real-time monitoring across CDI, CDQ, and EDC for enterprise data lineage and quality.|Database,Monitor,Activity\nFleet Management Dashboard|https://fleetmanagementreactprototype.vercel.app/|A comprehensive React-based system for overseeing fleet operations, maintenance, and logistics.|Truck,Map,BarChart",
  education: "[TIMELINE]\nPGDM in IT Business Analysis | Northern College | Scarborough, Ontario | May 2024 – Dec 2024 | GPA: 3.6 / 4.0\nPGDM in Mobile App Development | Northern College | Scarborough, Ontario | May 2023 – Dec 2023 | GPA: 3.6 / 4.0\nMaster of Computer Applications (MCA) | Madras University | Chennai, India | July 2020 – May 2022 | GPA: 3.8 / 4.0\nB.Sc. in Computer Science | SRM University | Chennai, India | July 2017 – May 2020 | GPA: 3.7 / 4.0",
  contact: "I'm always open to discussing new opportunities. You can reach me via email at yukeshv15@gmail.com, or find me on [LinkedIn](https://www.linkedin.com/in/yukeshvinayagan).",
  about: "I'm Yukesh, a Senior Software Engineer specializing in scalable systems and secure APIs. I combine technical depth with product thinking to build enterprise-grade applications.",
  salary: "My expected salary is **95,000 CAD**, though I am flexible based on the total compensation package.\n\nMore importantly, I am looking for a role that offers **opportunities for growth**, technical challenges, and the chance to contribute to the **company's long-term success and profitability**.",
  notice: "I have a **30-day notice period**, but it is negotiable for the right opportunity. I can ensure a smooth handover while transitioning quickly.",
  relocation: "I am **open to relocation** and also comfortable working in **hybrid or remote** environments, having successfully managed distributed teams in the past.",
  resume: "You can view and download my full resume here: \n\n[Download Resume (PDF)](https://drive.google.com/file/d/1mIIMMyT48ms2UtgKHXiN9UZNAjgN_bHl/view?usp=sharing)",
  default: "I can provide details about my **Technical Skills**, **Work Experience**, **Projects**, **Education**, or how to **Contact Me**. What would you like to know?"
};

const INITIAL_MESSAGE = "Hello World! Welcome to the digital workspace of **Yukesh Vinayagan**. \n\nI've initialized his professional profile—where **clean code** meets **scalable architecture**. I'm here to compile his journey in **Full Stack Development** for you. \n\nReady to execute? Ask me about his **projects**, **tech stack**, or **experience**.";

// Follow-up questions useful for employers
const FOLLOW_UP_SUGGESTIONS = [
  { id: 'salary', label: "Salary Expectations", prompt: "What are your salary expectations?" },
  { id: 'notice', label: "Notice Period", prompt: "What is your notice period?" },
  { id: 'relocation', label: "Relocation", prompt: "Are you open to relocation?" },
  { id: 'contact', label: "Schedule Interview", prompt: "How can I contact you to schedule an interview?" },
];

const MAIN_SUGGESTIONS = [
  { 
    id: 'projects',
    label: "Featured Projects", 
    sub: "View case studies",
    icon: <FolderGit2 size={18} className="text-purple-500" />,
    prompt: "Tell me about your key projects and case studies." 
  },
  { 
    id: 'skills',
    label: "Technical Skills", 
    sub: "Frontend, Backend, DevOps",
    icon: <Code size={18} className="text-blue-500" />,
    prompt: "What is your technical skill stack?" 
  },
  { 
    id: 'experience',
    label: "Work Experience", 
    sub: "Career history timeline",
    icon: <Briefcase size={18} className="text-orange-500" />,
    prompt: "Summarize your professional experience." 
  },
  { 
    id: 'education',
    label: "Education", 
    sub: "Degrees & Certifications",
    icon: <GraduationCap size={18} className="text-pink-500" />,
    prompt: "What is your educational background?" 
  },
  { 
    id: 'resume',
    label: "Download Resume", 
    sub: "PDF Format",
    icon: <FileText size={18} className="text-red-500" />,
    prompt: "I'd like to download your resume." 
  },
  { 
    id: 'contact',
    label: "Contact Me", 
    sub: "Email & Socials",
    icon: <Mail size={18} className="text-green-500" />,
    prompt: "How can I get in touch with you?" 
  },
];

const SIDEBAR_ITEMS = [
  { id: 'projects', label: "Projects", icon: <LayoutGrid size={16} />, prompt: "Tell me about your key projects and case studies." },
  { id: 'skills', label: "Skills", icon: <Terminal size={16} />, prompt: "What is your technical skill stack?" },
  { id: 'experience', label: "Experience", icon: <Briefcase size={16} />, prompt: "Summarize your professional experience." },
  { id: 'education', label: "Education", icon: <GraduationCap size={16} />, prompt: "What is your educational background?" },
  { id: 'contact', label: "Contact", icon: <UserCircle size={16} />, prompt: "How can I get in touch with you?" },
  { id: 'resume', label: "Resume", icon: <FileText size={16} />, prompt: "I'd like to download your resume." },
];

const RECENT_CHATS = [
  "AI Portfolio Design Prompt",
  "Full Stack Development",
  "React & Tailwind Architecture",
  "System Design Questions"
];

export function AIChatHero() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, []);

  // Theme configuration
  const theme = isDarkMode ? {
    bgMain: "bg-[#212121]",
    bgSidebar: "bg-[#171717]",
    textMain: "text-[#ECECEC]",
    textStrong: "text-white",
    textSecondary: "text-gray-400",
    border: "border-white/10",
    borderStrong: "border-white/20",
    inputBg: "bg-[#2F2F2F]",
    inputBorder: "border-gray-700/50",
    bubbleUser: "bg-[#2F2F2F]",
    bubbleAI: "text-[#ECECEC]",
    hover: "hover:bg-[#2F2F2F]",
    hoverSidebar: "hover:bg-[#212121]",
    icon: "text-gray-400",
    iconHover: "hover:text-white",
    iconActive: "text-white",
    shadow: "shadow-lg",
    suggestionBg: "bg-[#2F2F2F]/50",
    suggestionBorder: "border-[#3E3E3E]",
    suggestionHover: "hover:bg-[#2F2F2F]",
    codeBlock: "bg-black/30",
    markdownStrong: "text-white",
    cardBg: "bg-[#171717]",
    cardBorder: "border-white/5",
    timelineLine: "border-[#333]"
  } : {
    bgMain: "bg-white",
    bgSidebar: "bg-[#F9F9F9]",
    textMain: "text-[#374151]",
    textStrong: "text-[#111827]",
    textSecondary: "text-gray-500",
    border: "border-gray-200",
    borderStrong: "border-gray-300",
    inputBg: "bg-[#F4F4F4]",
    inputBorder: "border-transparent",
    bubbleUser: "bg-[#F4F4F4]",
    bubbleAI: "text-[#374151]",
    hover: "hover:bg-[#F3F4F6]",
    hoverSidebar: "hover:bg-[#E5E7EB]",
    icon: "text-gray-500",
    iconHover: "hover:text-black",
    iconActive: "text-black",
    shadow: "shadow-sm",
    suggestionBg: "bg-white",
    suggestionBorder: "border-gray-200",
    suggestionHover: "hover:bg-gray-50",
    codeBlock: "bg-gray-100",
    markdownStrong: "text-black",
    cardBg: "bg-white",
    cardBorder: "border-gray-200",
    timelineLine: "border-gray-200"
  };

  // Robust scrolling to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    // Increased timeout to ensure layout is fully recalculated
    setTimeout(() => {
        if (mainScrollRef.current) {
            mainScrollRef.current.scrollTo({
                top: mainScrollRef.current.scrollHeight,
                behavior: behavior
            });
        }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          role: 'ai',
          content: INITIAL_MESSAGE,
        },
      ]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Specific checks first
    if (lowerQuery.includes('salary') || lowerQuery.includes('compensation') || lowerQuery.includes('rate')) return RESUME_DATA.salary;
    if (lowerQuery.includes('notice') || lowerQuery.includes('join') || lowerQuery.includes('start')) return RESUME_DATA.notice;
    if (lowerQuery.includes('relocation') || lowerQuery.includes('remote') || lowerQuery.includes('move')) return RESUME_DATA.relocation;
    if (lowerQuery.includes('resume') || lowerQuery.includes('cv') || lowerQuery.includes('download')) return RESUME_DATA.resume;
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('hire') || lowerQuery.includes('schedule') || lowerQuery.includes('touch')) return RESUME_DATA.contact;
    
    // Broad checks
    if (lowerQuery.includes('skill') || lowerQuery.includes('stack') || lowerQuery.includes('tech')) return RESUME_DATA.skills;
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) return RESUME_DATA.experience;
    if (lowerQuery.includes('project') || lowerQuery.includes('app') || lowerQuery.includes('portfolio')) return RESUME_DATA.projects;
    if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('degree') || lowerQuery.includes('college') || lowerQuery.includes('university') || lowerQuery.includes('master') || lowerQuery.includes('bachelor')) return RESUME_DATA.education;
    if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('intro')) return RESUME_DATA.about;
    
    return RESUME_DATA.default;
  };

  const handleSendMessage = (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Reset height and keep focus on desktop
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        if (window.innerWidth > 768) {
             textareaRef.current.focus();
        }
    }
    
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseContent = generateResponse(userMessage.content);
      const isComplexContent = responseContent.startsWith('[PROJECTS]') || responseContent.startsWith('[TIMELINE]');

      if (isComplexContent) {
          const aiMessage = {
            id: Date.now() + 1,
            role: 'ai',
            content: responseContent
          };
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);
      } else {
          // Streaming text effect
          const aiMessageId = Date.now() + 1;
          const initialAiMessage = {
            id: aiMessageId,
            role: 'ai',
            content: '' // Start empty
          };
          setMessages(prev => [...prev, initialAiMessage]);
          
          let currentIndex = 0;
          const typingSpeed = 30; // ms per chunk
          const chunkSize = 2; // chars per chunk
          
          const intervalId = setInterval(() => {
              if (currentIndex >= responseContent.length) {
                  clearInterval(intervalId);
                  setIsTyping(false);
                  return;
              }

              const nextChunk = responseContent.slice(currentIndex, currentIndex + chunkSize);
              currentIndex += chunkSize;

              setMessages(prevMessages => 
                  prevMessages.map(msg => 
                      msg.id === aiMessageId 
                          ? { ...msg, content: msg.content + nextChunk }
                          : msg
                  )
              );
          }, typingSpeed);
      }
    }, 1000); 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
        {
          id: Date.now(),
          role: 'ai',
          content: INITIAL_MESSAGE,
        },
    ]);
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
    // Scroll back to top
    if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
    }
  };

  // Render markdown-like bolding and links
  const renderContent = (content: string) => {
    if (content.startsWith('[PROJECTS]')) {
        const lines = content.split('\n').slice(1);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {lines.map((line, idx) => {
                    if (!line.trim()) return null;
                    const [title, url, desc, iconString] = line.split('|');
                    const icons = iconString ? iconString.split(',') : [];

                    // Map string names to Lucide icons
                    const getIcon = (name: string) => {
                        switch(name.trim()) {
                            case 'Database': return <Database size={16} />;
                            case 'Monitor': return <Monitor size={16} />;
                            case 'Activity': return <Activity size={16} />;
                            case 'Truck': return <Truck size={16} />;
                            case 'Map': return <Map size={16} />;
                            case 'BarChart': return <BarChart size={16} />;
                            default: return <Code size={16} />;
                        }
                    };

                    return (
                        <a 
                            key={idx} 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-4 rounded-xl border ${theme.border} ${isDarkMode ? 'bg-[#2F2F2F]/30 hover:bg-[#2F2F2F]/50' : 'bg-gray-50 hover:bg-gray-100'} transition-all group relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full ${idx === 0 ? 'bg-blue-500' : 'bg-purple-500'} opacity-80`} />
                            
                            <div className="flex justify-between items-start mb-3">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                                    {idx === 0 ? <Database size={20} /> : <Truck size={20} />}
                                </div>
                                <ExternalLink size={16} className={`${theme.textSecondary} group-hover:text-blue-500 transition-colors`} />
                            </div>
                            
                            <h3 className={`font-bold text-base mb-1 ${theme.textStrong}`}>{title}</h3>
                            <p className={`text-sm ${theme.textSecondary} mb-4 leading-relaxed line-clamp-3`}>{desc}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {icons.map((iconName, i) => (
                                    <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${theme.codeBlock} ${theme.textSecondary} border ${theme.border}`}>
                                        {getIcon(iconName)}
                                        <span>{iconName}</span>
                                    </div>
                                ))}
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }

    if (content.startsWith('[TIMELINE]')) {
        const lines = content.split('\n').slice(1);
        return (
            <div className="pt-2">
                <ol className={`relative border-l ${theme.borderStrong} ml-2 space-y-8`}>
                    {lines.map((line, idx) => {
                        if (!line.trim()) return null;
                        const [role, place, location, date, gpa] = line.split('|').map(s => s.trim());
                        return (
                            <li key={idx} className="ml-6">
                                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ${isDarkMode ? 'ring-[#212121] bg-blue-900' : 'ring-white bg-blue-100'}`}>
                                    <GraduationCap size={12} className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                                </span>
                                <h3 className={`flex items-center mb-1 text-sm md:text-base font-semibold ${theme.textStrong}`}>{role}</h3>
                                <time className={`block mb-2 text-xs md:text-sm font-normal leading-none ${theme.textSecondary}`}>{date}</time>
                                <p className={`mb-1 text-sm md:text-base font-normal ${theme.textMain}`}>{place} | {location}</p>
                                <p className={`text-xs ${theme.textSecondary} font-mono ${theme.codeBlock} inline-block px-2 py-1 rounded`}>{gpa}</p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }

    return content.split('\n').map((line, i) => {
      // Basic link parsing for markdown [text](url)
      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [fullMatch, text, url] = linkMatch;
        const parts = line.split(fullMatch);
        return (
          <p key={i} className={`mb-2 last:mb-0`}>
            {parts[0]}
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-semibold underline ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
            >
               {text}
            </a>
            {parts[1]}
          </p>
        );
      }

      return (
        <p key={i} className={`mb-2 last:mb-0 ${line.startsWith('**') ? '' : ''}`}>
          {line.split('**').map((part, j) => 
            j % 2 === 1 ? <strong key={j} className={`font-semibold ${theme.markdownStrong}`}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className={`flex h-[100dvh] font-sans overflow-hidden transition-colors duration-300 ${theme.bgMain} ${theme.textMain}`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <motion.div 
        initial={{ width: 260, opacity: 1 }}
        animate={{ 
            width: isSidebarOpen ? 260 : 0,
            opacity: isSidebarOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${theme.bgSidebar} flex flex-col border-r ${theme.border} overflow-hidden whitespace-nowrap shrink-0 fixed md:relative h-full z-40 transition-colors duration-300 shadow-xl md:shadow-none left-0 top-0`}
      >
        <div className="flex-1 flex flex-col p-3 overflow-y-auto custom-scrollbar">
            {/* Sidebar Header with New Chat and Mobile Close */}
            <div className={`sticky top-0 ${theme.bgSidebar} z-10 mb-6`}>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleNewChat}
                        className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-lg ${theme.hoverSidebar} transition-colors text-sm ${theme.textMain} border ${theme.border} group`}
                    >
                        <div className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} p-0.5 rounded-full`}>
                            <Plus size={14} strokeWidth={3} />
                        </div>
                        <span className="font-medium">New chat</span>
                    </button>
                    
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className={`md:hidden p-3 rounded-lg ${theme.hoverSidebar} ${theme.textSecondary} hover:${theme.textStrong} border ${theme.border}`}
                    >
                        <PanelLeftClose size={20} />
                    </button>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="mb-6">
                <div className={`px-3 mb-2 text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Explore</div>
                <div className="space-y-1">
                    {SIDEBAR_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                handleSendMessage(undefined, item.prompt);
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.hoverSidebar} ${theme.textSecondary} hover:${theme.textStrong} transition-colors text-sm group`}
                        >
                            <span className={`${theme.icon} group-hover:${theme.iconActive} transition-colors`}>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent History */}
            <div>
                <div className={`px-3 mb-2 text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Recent</div>
                <div className="space-y-1">
                    {RECENT_CHATS.map((chat, idx) => (
                        <button
                            key={idx}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.hoverSidebar} ${theme.textSecondary} hover:${theme.textStrong} transition-colors text-sm truncate`}
                        >
                            <span className={`shrink-0 ${theme.icon}`}><History size={16} /></span>
                            <span className="truncate">{chat}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-3 border-t ${theme.border} ${theme.bgSidebar}`}>
            <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg ${theme.hoverSidebar} ${theme.textSecondary} hover:${theme.textStrong} transition-colors text-sm`}>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    YV
                </div>
                <div className="flex flex-col items-start truncate">
                    <span className={`font-medium ${theme.textStrong}`}>Yukesh Vinayagan</span>
                    <span className="text-xs opacity-70">Free Plan</span>
                </div>
            </button>
        </div>
      </motion.div>

      {/* Main Content Area - Scrollable Container for BOTH Chat and History */}
      <div ref={mainScrollRef} className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth relative">
        
        {/* Chat Wrapper - Takes up at least full screen */}
        <div className="min-h-[100dvh] flex flex-col relative">
            
            {/* Top Navigation Bar */}
            <div className={`sticky top-0 shrink-0 flex justify-between items-center p-3 md:p-4 ${theme.bgMain} z-20 transition-colors duration-300 border-b ${theme.border}`}>
                <div className="flex items-center gap-3">
                    {!isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className={`p-2 ${theme.textSecondary} hover:${theme.textStrong} rounded-lg ${theme.hover} transition-colors`}
                            title="Open sidebar"
                        >
                            <PanelLeftOpen size={20} />
                        </button>
                    )}
                    {isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className={`p-2 ${theme.textSecondary} hover:${theme.textStrong} rounded-lg ${theme.hover} transition-colors md:hidden`}
                            title="Close sidebar"
                        >
                            <PanelLeftClose size={20} />
                        </button>
                    )}
                    
                    {isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className={`hidden md:block p-2 ${theme.textSecondary} hover:${theme.textStrong} rounded-lg ${theme.hover} transition-colors`}
                            title="Close sidebar"
                        >
                            <PanelLeftClose size={20} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${theme.hover} cursor-pointer transition-colors group`}>
                        <span className={`text-lg font-semibold ${theme.textStrong}`}>YukeshGPT</span>
                        <span className={`${theme.textSecondary} text-lg`}>4.0</span>
                        <ChevronDown size={16} className={`${theme.textSecondary} mt-1`} />
                    </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3">
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 ${theme.textSecondary} hover:${theme.textStrong} rounded-full ${theme.hover} transition-colors`}
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className={`p-2 ${theme.textSecondary} hover:${theme.textStrong} rounded-full ${theme.hover} transition-colors`}>
                        <ExternalLink size={20} />
                </button>
                <div className={`w-8 h-8 rounded-full overflow-hidden border ${theme.borderStrong}`}>
                        <ImageWithFallback 
                            src={chatGPTIcon} 
                            alt="ChatGPT"
                            className="w-full h-full object-cover bg-white"
                        />
                </div>
                </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 px-4 pt-2">
                <div className="max-w-3xl mx-auto flex flex-col h-full">
                    
                    {messages.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center opacity-50 py-20">
                            <div className={`w-12 h-12 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center mb-6`}>
                                <Bot size={24} />
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        const isLastMessage = index === messages.length - 1;
                        const isAI = msg.role === 'ai';

                        return (
                            <div key={msg.id} className="mb-6 last:mb-0">
                                <div className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {isAI && (
                                    <div className={`w-8 h-8 rounded-full bg-[#19C37D] flex items-center justify-center shrink-0 border ${theme.border} mt-1`}>
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                    )}

                                    <div className={`max-w-[85%] md:max-w-[80%]`}>
                                        <div className={`
                                            group relative text-[15px] leading-7
                                            ${msg.role === 'user' ? `${theme.bubbleUser} px-5 py-3 rounded-3xl ${theme.textStrong}` : `${theme.bubbleAI} pt-1`}
                                        `}>
                                            {isAI ? (
                                            <div className="markdown-body">
                                                {renderContent(msg.content)}
                                            </div>
                                            ) : (
                                            <p>{msg.content}</p>
                                            )}
                                        </div>

                                        {isAI && (
                                            <div className="flex items-center gap-1 mt-1 -ml-2 select-none">
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(msg.content).catch((err) => {
                                                            console.error('Failed to copy text: ', err);
                                                        });
                                                    }}
                                                    className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} 
                                                    title="Copy"
                                                >
                                                    <Copy size={15} />
                                                </button>
                                                <button className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} title="Good response">
                                                    <ThumbsUp size={15} />
                                                </button>
                                                <button className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} title="Bad response">
                                                    <ThumbsDown size={15} />
                                                </button>
                                                <button className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} title="Share">
                                                    <Upload size={15} />
                                                </button>
                                                <button 
                                                    onClick={() => handleSendMessage(undefined, msg.content)}
                                                    className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} 
                                                    title="Regenerate"
                                                >
                                                    <RotateCw size={15} />
                                                </button>
                                                <button className={`p-2 rounded-md ${theme.textSecondary} hover:${theme.textStrong} hover:${theme.hover} transition-colors`} title="More">
                                                    <MoreHorizontal size={15} />
                                                </button>
                                            </div>
                                        )}

                                        {msg.id === 1 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6"
                                            >
                                                {MAIN_SUGGESTIONS.map((suggestion) => (
                                                <button
                                                    key={suggestion.id}
                                                    onClick={() => {
                                                        handleSendMessage(undefined, suggestion.prompt)
                                                    }}
                                                    className={`flex items-center gap-4 p-4 text-left ${theme.suggestionBg} ${theme.suggestionHover} border ${theme.suggestionBorder} rounded-xl transition-all group`}
                                                >
                                                    <div className={`p-2 ${isDarkMode ? 'bg-[#212121]' : 'bg-gray-100'} rounded-lg border ${theme.suggestionBorder} group-hover:border-gray-400 transition-colors`}>
                                                        {suggestion.icon}
                                                    </div>
                                                    <div>
                                                        <div className={`font-semibold ${theme.textStrong} text-sm`}>{suggestion.label}</div>
                                                        <div className={`${theme.textSecondary} text-xs`}>{suggestion.sub}</div>
                                                    </div>
                                                </button>
                                                ))}
                                            </motion.div>
                                        )}
                                        
                                        {isAI && msg.id !== 1 && isLastMessage && !isTyping && (
                                            <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-wrap gap-2 mt-4"
                                            >
                                                {FOLLOW_UP_SUGGESTIONS.map((s) => (
                                                    <button
                                                        key={s.id}
                                                        onClick={() => handleSendMessage(undefined, s.prompt)}
                                                        className={`px-4 py-2 ${theme.suggestionBg} ${theme.hover} border ${theme.suggestionBorder} rounded-xl text-sm ${theme.textSecondary} transition-colors flex items-center gap-2`}
                                                    >
                                                        {s.id === 'salary' && <DollarSign size={14} className="text-green-500" />}
                                                        {s.id === 'notice' && <Clock size={14} className="text-blue-500" />}
                                                        {s.id === 'relocation' && <MapPin size={14} className="text-red-500" />}
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>

                                    {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-[#5436DA] flex items-center justify-center shrink-0 text-white mt-1">
                                        <UserCircle size={20} />
                                    </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isTyping && (
                        <div className="flex gap-4 mb-6 justify-start w-full">
                            <div className={`w-8 h-8 rounded-full bg-[#19C37D] flex items-center justify-center shrink-0 border ${theme.border}`}>
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="flex items-center gap-1 pt-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    
                    {/* Ref for scrolling to bottom of CHAT, not page */}
                    <div ref={messagesEndRef} className="h-4"></div>
                </div>
            </div>

            {/* Input Area - Sticky at bottom of Chat Wrapper */}
            <div className={`sticky bottom-0 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#212121] via-[#212121]' : 'from-white via-white'} to-transparent pt-4 pb-6 px-4 z-10 transition-colors duration-300 mt-auto`}>
                <div className="max-w-3xl mx-auto">
                    <div className={`relative ${theme.inputBg} rounded-3xl ${theme.shadow} border ${theme.inputBorder} flex items-end overflow-hidden focus-within:border-gray-500 transition-colors`}>
                        <button className={`p-3 mb-1 ml-1 ${theme.icon} ${theme.iconHover} transition-colors rounded-full ${theme.hover}`}>
                            <Paperclip size={20} />
                        </button>

                        <textarea 
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message YukeshGPT..." 
                            className={`flex-1 max-h-[150px] bg-transparent border-none ${theme.textMain} placeholder-gray-400 focus:ring-0 py-3.5 px-2 resize-none leading-6 scrollbar-hide focus:outline-none`}
                            rows={1}
                        />

                        <div className="flex items-end pr-2 pb-2 gap-1">
                            {!inputValue.trim() && (
                                <button className={`p-2 ${theme.icon} ${theme.iconHover} transition-colors rounded-full ${theme.hover}`}>
                                <Mic size={20} />
                                </button>
                            )}
                            <button 
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                className={`p-2 rounded-lg transition-all mb-0.5 ${inputValue.trim() ? 'bg-black text-white' : 'bg-transparent text-gray-400 cursor-not-allowed'}`}
                            >
                                <Send size={18} fill={inputValue.trim() ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>
                    
                    <div className={`text-center mt-3 text-xs ${theme.textSecondary}`}>
                        <span className="hidden md:inline">YukeshGPT can make mistakes. Consider checking important information.</span>
                        <span className="md:hidden">YukeshGPT v4.0</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

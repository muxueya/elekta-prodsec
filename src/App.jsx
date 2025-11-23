import React, { useState, useEffect, useRef } from 'react';
import { Shield, Terminal, Cpu, Wifi, Lock, User, Zap, AlertTriangle, CheckCircle, Code, Coffee, Bug, Scale, Brain, FileText, Search, X, Database, Share2, Activity, Camera, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

// ==========================================
// 🔧 CUSTOMIZE YOUR PROFILE HERE
// ==========================================
const HERO_DATA = {
  id: 'hero',
  name: "JIALEI 'EMMA' QIAN", 
  role: "PRODUCT SECURITY ENGINEER", 
  clearance: "LEVEL 5 (CLASSIFIED)",
  status: "ONLINE",
  avatarColor: "text-cyan-400",
  bio: "Multidisciplinary tactician merging 6+ years of legal expertise with advanced cybersecurity engineering. Specialized in bridging the gap between technical implementation and regulatory compliance (ISO 27001, NIS2, GDPR). Advocate for human-centered security design and ethical AI.",
  stats: [
    { label: "GRC & Compliance", value: 98, color: "bg-yellow-400" },
    { label: "AI/ML Security", value: 70, color: "bg-purple-400" },
    { label: "DevSecOps", value: 65, color: "bg-cyan-400" },
    { label: "Threat Analysis", value: 80, color: "bg-green-400" }
  ],
  traits: [
    { icon: Scale, text: "Legal-Tech Hybrid" },
    { icon: Brain, text: "AI Defender" },
    { icon: Shield, text: "Secure by Design" },
    { icon: Search, text: "Forensics Expert" }
  ],
  missions: [
    {
      id: "OP-SOREL",
      title: "Lightweight ML Malware Detection",
      desc: "Developed an explainable approach for static malware detection using the SOREL-20M dataset. Focused on model transparency and efficiency.",
      tech: ["Python", "Scikit-learn", "Pandas", "SHAP"],
      fullDetails: [
        "Utilized the massive SOREL-20M dataset (20 million samples) to train lightweight classifiers.",
        "Prioritized 'Explainable AI' (XAI) to ensure security analysts understand WHY a binary is flagged.",
        "Achieved 90%+ detection rates with significantly lower computational overhead than deep learning baselines.",
        "Engineered feature extraction pipelines optimized for static analysis of PE headers."
      ]
    },
    {
      id: "OP-GRC-BRIDGE",
      title: "CTI to GRC Integration",
      desc: "Architected a framework to integrate Cyber Threat Intelligence directly into Governance, Risk, and Compliance workflows for real-time risk adaptation.",
      tech: ["STIX/TAXII", "Python Scripts", "Risk APIs", "ISO 27001"],
      fullDetails: [
        "Designed a dynamic bridge between Threat Intel feeds (CTI) and Risk Registers.",
        "Automated the adjustment of risk scores based on active, wild threats rather than static periodic reviews.",
        "Mapped CVE data directly to compliance controls (ISO 27001/NIST) to identify regulatory gaps in real-time.",
        "Reduced time-to-assessment for emerging threats by automating the 'Applicability' check."
      ]
    }
  ],
  gallery: [
    { id: "IMG_8821", caption: "Stockholm Archipelago Retreat", location: "59.3293° N, 18.0686° E", type: "PERSONAL" },
    { id: "IMG_9942", caption: "Hackathon Finals 2024", location: "Kista Science City", type: "WORK" },
    { id: "IMG_1102", caption: "Server Room Maintenance", location: "Data Center Sector 7", type: "WORK" },
    { id: "IMG_3319", caption: "Escape Room Team Building", location: "Fox in a Box", type: "SOCIAL" }
  ],
  likes: ["Ethical AI", "Escape Rooms", "Clear Documentation", "Puzzles"],
  dislikes: ["Regulatory Non-compliance", "Black Box Models", "Security Theater", "Unpatched Vulnerabilities"]
};

// ==========================================
// 🎨 CUSTOM AVATAR COMPONENT
// ==========================================
const AnimeAvatar = ({ size = "full" }) => (
  <div className={`relative ${size === "full" ? "w-full h-full" : "w-32 h-32"} flex items-center justify-center overflow-hidden rounded-full bg-gray-900`}>
    <svg viewBox="0 0 200 200" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hairGradient" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="2" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M50 70 C30 90 30 160 45 180 C55 200 145 200 155 180 C170 160 170 90 150 70" fill="url(#hairGradient)" />
      <path d="M65 80 L65 130 C65 160 100 180 135 130 L135 80" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
      <path d="M85 170 L85 210 M115 170 L115 210" stroke="#334155" strokeWidth="3" />
      <path d="M45 90 C45 10 155 10 155 90 C155 90 145 50 130 95 C120 115 110 90 100 110 C90 90 80 115 70 95 C55 50 45 90 45 90 Z" fill="url(#hairGradient)" />
      <g filter="url(#glow)">
        <path d="M65 110 Q80 110 80 125 Q80 135 65 135 Q50 135 50 125 Q50 110 65 110 Z" stroke="#22D3EE" strokeWidth="2" fill="rgba(34,211,238,0.15)" />
        <path d="M135 110 Q150 110 150 125 Q150 135 135 135 Q120 135 120 125 Q120 110 135 110 Z" stroke="#22D3EE" strokeWidth="2" fill="rgba(34,211,238,0.15)" />
        <line x1="80" y1="118" x2="120" y2="118" stroke="#22D3EE" strokeWidth="2" />
      </g>
      <circle cx="65" cy="125" r="3" fill="#22D3EE" />
      <circle cx="135" cy="125" r="3" fill="#22D3EE" />
      <rect x="55" y="140" width="10" height="2" fill="#22D3EE" opacity="0.5" />
      <rect x="135" y="140" width="10" height="2" fill="#22D3EE" opacity="0.5" />
    </svg>
  </div>
);

// ==========================================
// 🎨 MAIN APP COMPONENT
// ==========================================

const App = () => {
  const [gameState, setGameState] = useState('BOOT'); // BOOT, INTRO, SELECT, DETAIL, FINAL
  
  useEffect(() => {
    const timer = setTimeout(() => setGameState('INTRO'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono overflow-hidden selection:bg-green-900 selection:text-white relative">
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      <div className="pointer-events-none fixed inset-0 z-40 animate-pulse opacity-5 bg-white mix-blend-overlay"></div>

      {gameState === 'BOOT' && <BootSequence />}
      {gameState === 'INTRO' && <IntroScreen onStart={() => setGameState('SELECT')} />}
      {gameState === 'SELECT' && <SelectionScreen onSelect={() => setGameState('DETAIL')} />}
      {gameState === 'DETAIL' && <CharacterDetail onBack={() => setGameState('SELECT')} onConfirm={() => setGameState('FINAL')} />}
      {gameState === 'FINAL' && <WelcomeScreen />}
      
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-10 left-10 animate-bounce"><Wifi size={48} /></div>
         <div className="absolute bottom-20 right-20 animate-pulse"><Lock size={64} /></div>
         <div className="absolute top-1/2 left-1/4 animate-ping"><Cpu size={32} /></div>
      </div>
    </div>
  );
};

// ==========================================
// 🖥️ SUB-COMPONENTS
// ==========================================

const BootSequence = () => {
  const [lines, setLines] = useState([]);
  const bootText = [
    "INITIALIZING PRODSEC KERNEL...",
    "LOADING MDR COMPLIANCE MODULES...",
    "DECRYPTING BIOMETRICS...",
    "ESTABLISHING ELEKTA SECURE LINK...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      delay += Math.random() * 400 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-end p-8 pb-20 text-sm md:text-lg text-green-400">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">{'>'} {line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};

const IntroScreen = ({ onStart }) => (
  <div className="h-screen flex flex-col items-center justify-center relative z-10">
    <div className="border-2 border-green-500 p-2 mb-8 animate-pulse">
      <div className="bg-green-500 text-black px-4 py-1 font-bold text-xs tracking-widest">ELEKTA_SECURE_TERMINAL_V4.0</div>
    </div>
    
    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 tracking-tighter mb-2 relative group cursor-default">
      <span className="absolute -inset-1 blur opacity-30 bg-green-400 group-hover:opacity-60 transition-opacity duration-500"></span>
      ELEKTA: PRODSEC
    </h1>
    <p className="text-green-700 tracking-[0.5em] text-sm md:text-xl mb-12 uppercase font-bold">Product Security Onboarding</p>

    <button 
      onClick={onStart}
      className="group relative px-8 py-4 bg-black border border-green-500 hover:bg-green-900/30 transition-all duration-300 outline-none focus:ring-2 focus:ring-green-400"
    >
      <div className="absolute inset-0 w-full h-full border-t border-b border-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      <span className="relative flex items-center gap-3 text-xl font-bold tracking-wider">
        <Terminal size={20} />
        INITIATE SELECTION
      </span>
    </button>
  </div>
);

const SelectionScreen = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 z-10 relative">
      <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest border-b-2 border-green-500/50 pb-4">
        Choose Your Teammate
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <LockedCard id="01" label="OFFLINE" />
        
        <div 
          onClick={onSelect}
          className="relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-400 to-green-500 opacity-75 blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative h-96 bg-black border border-cyan-500/50 flex flex-col items-center p-6 overflow-hidden">
            <div className="absolute top-0 left-0 bg-cyan-500 text-black text-xs px-2 py-1 font-bold">NEW SIGNAL</div>
            <div className="w-full h-full border border-cyan-900/30 absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[gradient_3s_linear_infinite]"></div>
            
            <div className="mt-10 mb-6 relative">
              <div className="w-32 h-32 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-900/20 group-hover:bg-cyan-900/40 transition-colors p-1">
                <AnimeAvatar size="small" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black border border-cyan-400 p-1">
                <CheckCircle size={16} className="text-green-400" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{HERO_DATA.name.split(' ')[0]}</h3>
            <p className="text-cyan-400 text-sm tracking-widest mb-6">{HERO_DATA.role}</p>

            <div className="w-full mt-auto">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>COMPATIBILITY</span>
                <span>99.9%</span>
              </div>
              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-full animate-[load_2s_ease-in-out]"></div>
              </div>
            </div>
            
            <div className="mt-4 text-center w-full py-2 border border-cyan-500/30 text-cyan-400 text-sm group-hover:bg-cyan-400 group-hover:text-black transition-colors font-bold">
              VIEW DOSSIER
            </div>
          </div>
        </div>

        <LockedCard id="03" label="REDACTED" />
      </div>
    </div>
  );
};

const LockedCard = ({ id, label }) => (
  <div className="h-96 border border-red-900/50 bg-black/50 flex flex-col items-center justify-center p-6 relative opacity-60 grayscale select-none">
    <div className="absolute top-2 left-2 text-red-900 text-xs font-bold">UNIT {id}</div>
    <AlertTriangle size={48} className="text-red-900 mb-4 animate-pulse" />
    <h3 className="text-red-900 font-bold text-xl tracking-widest">{label}</h3>
    <p className="text-red-900/50 text-xs mt-2">ACCESS DENIED</p>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 w-full h-px bg-red-900/30 transform translate-x-full animate-[scan_4s_linear_infinite]"></div>
      <div className="absolute top-3/4 w-full h-px bg-red-900/30 transform -translate-x-full animate-[scan_3s_linear_infinite_reverse]"></div>
    </div>
  </div>
);

const ProjectModal = ({ mission, onClose }) => {
  if (!mission) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-cyan-500/50 shadow-[0_0_100px_rgba(6,182,212,0.2)] relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-cyan-900/20 p-4 border-b border-cyan-500/30 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Database className="text-cyan-400" size={20} />
             <div>
               <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Project File Decrypted</div>
               <div className="text-white font-bold text-lg leading-none">{mission.id}</div>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white hover:bg-red-500/20 p-2 rounded transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
           <h2 className="text-2xl font-bold text-white mb-4">{mission.title}</h2>
           <div className="flex flex-wrap gap-2 mb-6">
             {mission.tech.map((t, i) => <span key={i} className="px-2 py-1 bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-xs rounded">{t}</span>)}
           </div>
           <div className="space-y-4">
             <div className="bg-black/50 p-4 border-l-2 border-green-500">
               <h4 className="text-green-500 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Activity size={14} /> Operational Objective</h4>
               <p className="text-gray-300 text-sm">{mission.desc}</p>
             </div>
             <div>
               <h4 className="text-gray-400 text-xs uppercase font-bold mb-3 border-b border-gray-800 pb-1">Execution Details</h4>
               <ul className="space-y-3">
                 {mission.fullDetails.map((detail, i) => <li key={i} className="flex gap-3 text-gray-300 text-sm"><span className="text-cyan-500 mt-1">➤</span><span>{detail}</span></li>)}
               </ul>
             </div>
           </div>
        </div>
        <div className="p-4 border-t border-gray-800 bg-black/40 flex justify-end gap-4">
           <button className="px-4 py-2 border border-gray-700 text-gray-400 text-xs hover:bg-gray-800 transition-colors flex items-center gap-2"><Share2 size={14} /> SHARE REPORT</button>
           <button onClick={onClose} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs transition-colors">CLOSE FILE</button>
        </div>
      </div>
    </div>
  );
}

const ImageViewer = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-5xl h-[90vh] flex flex-col p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2">
          <div className="flex items-center gap-4">
             <Camera className="text-green-500 animate-pulse" />
             <div className="text-xs font-mono text-green-400">
               <span className="opacity-50">FILE_ID:</span> {image.id}
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-green-900/30 rounded-full text-green-500 transition-colors"><X /></button>
        </div>

        {/* Image Area */}
        <div className="flex-1 relative bg-gray-900/50 border border-green-900 rounded overflow-hidden group flex items-center justify-center">
           {/* Simulated Image (Placeholder) */}
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
              {/* Scan line animation */}
              <div className="absolute inset-0 bg-green-500/10 h-1 w-full top-0 animate-[scan_3s_linear_infinite]"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iIzIyYzU1ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
              
              <Camera size={64} className="text-green-700/50 mb-4" />
              <div className="text-2xl font-bold text-green-700/50 uppercase tracking-widest">Media Encrypted</div>
              <div className="text-xs text-green-800 mt-2 font-mono">Visual data redacted for demo</div>
           </div>

           {/* HUD Overlays */}
           <div className="absolute top-4 right-4 flex flex-col gap-2 items-end pointer-events-none">
             <div className="bg-black/60 px-2 py-1 text-[10px] text-green-400 border border-green-500/30">ISO 800</div>
             <div className="bg-black/60 px-2 py-1 text-[10px] text-green-400 border border-green-500/30">f/1.8</div>
             <div className="bg-black/60 px-2 py-1 text-[10px] text-green-400 border border-green-500/30">1/200s</div>
           </div>
        </div>

        {/* Bottom Meta */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-green-500/30 pt-4 font-mono text-xs">
           <div>
             <div className="text-gray-500">CAPTION</div>
             <div className="text-white font-bold">{image.caption}</div>
           </div>
           <div>
             <div className="text-gray-500">LOCATION</div>
             <div className="text-cyan-400">{image.location}</div>
           </div>
           <div>
             <div className="text-gray-500">CLASSIFICATION</div>
             <div className="text-yellow-500">{image.type}</div>
           </div>
           <div className="text-right flex justify-end items-end">
              <div className="text-green-600 animate-pulse">● LIVE VIEW</div>
           </div>
        </div>
      </div>
    </div>
  );
};

const CharacterDetail = ({ onBack, onConfirm }) => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative z-20 overflow-y-auto">
      
      {/* Modals */}
      {selectedMission && <ProjectModal mission={selectedMission} onClose={() => setSelectedMission(null)} />}
      {selectedImage && <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />}

      <button onClick={onBack} className="absolute top-4 left-4 md:top-8 md:left-8 text-green-500 hover:text-white flex items-center gap-2 uppercase text-xs font-bold tracking-widest z-50">
        <span className="text-lg">←</span> Abort
      </button>

      <div className="w-full max-w-6xl bg-black/90 border border-gray-800 flex flex-col md:flex-row shadow-[0_0_50px_rgba(16,185,129,0.1)] mt-12 md:mt-0">
        
        {/* Left Column: Visuals */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 p-8 flex flex-col items-center relative">
          <div className="absolute top-0 left-0 p-2 opacity-50"><Code size={120} className="text-gray-900 absolute -top-4 -left-4 rotate-12" /></div>
          <div className={`w-48 h-48 rounded-full border-4 border-double border-gray-700 flex items-center justify-center bg-gray-900/50 mb-6 relative overflow-hidden group p-1`}>
             <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
             <AnimeAvatar />
             <div className="absolute w-full h-1 bg-cyan-400/30 top-0 animate-[scan_2s_linear_infinite]"></div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center uppercase">{HERO_DATA.name}</h2>
          <div className="text-cyan-400 font-mono text-sm mt-1">{HERO_DATA.role}</div>
          <div className="px-3 py-1 rounded-full border border-green-500/50 text-green-400 text-xs mt-4 bg-green-900/20">CLEARANCE: {HERO_DATA.clearance}</div>
          <div className="mt-8 w-full">
             <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-3 border-b border-gray-800 pb-1">Core Traits</h4>
             <div className="grid grid-cols-2 gap-2">
               {HERO_DATA.traits.map((Trait, i) => <div key={i} className="flex items-center gap-2 text-xs text-gray-300 bg-gray-900/50 p-2 rounded border border-gray-800"><Trait.icon size={14} className="text-cyan-400" /><span>{Trait.text}</span></div>)}
             </div>
          </div>
          {/* Gallery Preview (Mobile/Small) */}
          <div className="mt-8 w-full md:hidden">
             <h4 className="text-green-400 text-xs font-bold uppercase mb-3 flex items-center gap-2"><Camera size={14} /> Media Archive</h4>
             <div className="grid grid-cols-4 gap-2">
               {HERO_DATA.gallery.map((img, i) => (
                 <div key={i} onClick={() => setSelectedImage(img)} className="aspect-square bg-gray-800 border border-gray-700 hover:border-green-500 cursor-pointer flex items-center justify-center text-gray-600 hover:text-green-400 transition-colors"><Maximize2 size={12} /></div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Stats & Info */}
        <div className="md:w-2/3 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div><h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Decrypting Bio...</h3><div className="h-px w-24 bg-green-500 mt-1"></div></div>
            <div className="flex gap-1"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-75"></div><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div></div>
          </div>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-8 border-l-2 border-green-500 pl-4">{HERO_DATA.bio}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
             {HERO_DATA.stats.map((stat, i) => (
               <div key={i}>
                 <div className="flex justify-between text-xs mb-1"><span className="text-gray-400 uppercase">{stat.label}</span><span className="text-white">{stat.value}%</span></div>
                 <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${stat.color} transition-all duration-1000 ease-out`} style={{ width: `${stat.value}%` }}></div></div>
               </div>
             ))}
          </div>

          {/* Gallery Grid (Desktop) */}
          <div className="mb-8 hidden md:block">
             <h4 className="text-cyan-400 text-xs font-bold uppercase mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
               <Camera size={14} /> Surveillance / Media Archive
             </h4>
             <div className="grid grid-cols-4 gap-4">
               {HERO_DATA.gallery.map((img, i) => (
                 <div 
                   key={i} 
                   onClick={() => setSelectedImage(img)}
                   className="aspect-square relative bg-gray-900 border border-gray-700 group cursor-pointer overflow-hidden hover:border-green-500 transition-colors"
                 >
                   {/* Placeholder visuals */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                     <div className="text-[10px] text-gray-600 font-mono mb-1">{img.id}</div>
                     <Maximize2 size={20} className="text-gray-600 group-hover:text-green-400 group-hover:scale-110 transition-all" />
                   </div>
                   {/* Overlay details on hover */}
                   <div className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="text-green-400 text-[10px] font-bold tracking-wider uppercase px-2 text-center">{img.type}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="mb-8">
             <h4 className="text-cyan-400 text-xs font-bold uppercase mb-4 flex items-center gap-2 border-b border-gray-800 pb-2"><FileText size={14} /> Mission Log / Recent Operations</h4>
             <p className="text-[10px] text-gray-500 mb-2 italic text-right">Click to inspect file...</p>
             <div className="grid grid-cols-1 gap-4">
                {HERO_DATA.missions.map((mission, i) => (
                  <button key={i} onClick={() => setSelectedMission(mission)} className="bg-gray-900/40 border border-gray-700 p-4 hover:border-cyan-500 hover:bg-cyan-900/10 transition-all duration-300 group text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="flex justify-between items-center mb-1"><span className="text-green-400 font-bold text-xs tracking-wider group-hover:text-cyan-400">{mission.id}</span><span className="text-[10px] text-gray-500 border border-gray-700 px-1 rounded flex items-center gap-1"><Database size={10} /> INSPECT</span></div>
                    <h5 className="text-white font-bold text-sm mb-2 group-hover:text-cyan-300 transition-colors">{mission.title}</h5>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{mission.desc}</p>
                  </button>
                ))}
             </div>
          </div>

          <button onClick={onConfirm} className="mt-auto w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 uppercase tracking-widest transition-colors flex items-center justify-center gap-3 group"><Zap size={20} className="group-hover:text-white transition-colors" /> Confirm Recruitment</button>
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen = () => (
  <div className="h-screen flex flex-col items-center justify-center z-20 relative text-center p-4">
    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce"><CheckCircle size={48} className="text-black" /></div>
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">WELCOME TO THE TEAM</h1>
    <p className="text-green-400 font-mono max-w-xl">Credentials verified. Workspace initialized. <br/> Let's build something secure.</p>
    <div className="mt-12 p-4 border border-green-900 bg-black/80 text-xs text-gray-500 font-mono">SESSION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} <br/> TIMESTAMP: {new Date().toISOString()}</div>
  </div>
);

export default App;

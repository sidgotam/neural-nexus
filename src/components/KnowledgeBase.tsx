import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { FileText, Eye, X, BookOpen } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  classification: 'SECRET' | 'RESTRICTED' | 'UNCLASSIFIED';
  diagram: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: "ART-409",
    title: "Quantum Decryption Vectors in Dystopian Neural Nets",
    category: "Quantum Computing",
    summary: "Exploring cryptographic resilience under high-frequency quantum decay cycles in year 2099 core architectures.",
    classification: "SECRET",
    diagram: (
      <svg className="w-full h-16 stroke-neon-cyan" viewBox="0 0 100 30" fill="none">
        <path d="M5 15H15L20 5L25 25L30 10L35 20L40 15H95" strokeWidth="1" />
        <circle cx="20" cy="5" r="2" fill="#00F0FF" />
        <circle cx="25" cy="25" r="2" fill="#FF0066" />
        <text x="50" y="10" fill="#00F0FF" className="font-mono text-[7px]">DECAY RATIO: 0.8192</text>
      </svg>
    ),
    content: "With the advent of commercial quantum arrays in 2099, traditional elliptic curve cryptography has been rendered obsolete. In this dossier, we analyze the decay vectors of modern high-density neural networks under continuous quantum bombardment. By introducing dynamic key rotation at the synapse layer, we can increase decryption resistance factors by up to 400%.\n\nRECOMMENDED ACTION PROTOCOLS:\n1. Re-initialize AES-Q-8192 parameters.\n2. Enable neural route mapping randomization.\n3. Disconnect auxiliary sat-link nodes during burst decryption cycles."
  },
  {
    id: "ART-812",
    title: "Deepfake Biometric Countermeasures: Face Wireframe Analysis",
    category: "Deepfake Detection",
    summary: "Algorithmic synthesis of frequency anomalies to instantly isolate synthetic digital human simulations.",
    classification: "RESTRICTED",
    diagram: (
      <svg className="w-full h-16 stroke-neon-pink" viewBox="0 0 100 30" fill="none">
        <circle cx="50" cy="15" r="9" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M40 15H60M50 5V25" strokeWidth="0.5" />
        <text x="65" y="18" fill="#FF0066" className="font-mono text-[7px]">BLINKS: 0.05s</text>
      </svg>
    ),
    content: "Synthetic videos generated via generative neural nets continue to populate public intelligence channels. Our Biometric Lab focuses on isolating pixel-level micro-glitches and eye-blinking inconsistency ratios. Fake digital actors generally exhibit lip-sync latencies of 12ms to 18ms and flat thermal energy output values across facial capillaries.\n\nSCANNING PROCEDURE:\n1. Execute 'RUN BIOMETRIC CHECK' on the target profile.\n2. Observe Eye Blinking Coherence metrics.\n3. Verify against residual high-frequency color spectrum maps."
  },
  {
    id: "ART-103",
    title: "Autonomous Cognitive Warfare Shielding",
    category: "Cybersecurity",
    summary: "Protecting cybernetic neural implants from localized frequency hijackers.",
    classification: "SECRET",
    diagram: (
      <svg className="w-full h-16 stroke-neon-green" viewBox="0 0 100 30" fill="none">
        <rect x="10" y="5" width="20" height="20" strokeWidth="1" />
        <rect x="70" y="5" width="20" height="20" strokeWidth="1" />
        <path d="M30 15C45 10 55 20 70 15" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="35" y="10" fill="#00FFAA" className="font-mono text-[7px]">SHIELD: 100%</text>
      </svg>
    ),
    content: "Cognitive hijack attacks target sub-dermal transceiver nodes to gain access to neural operating systems. This dossier documents defensive routing algorithms that automatically redirect high-energy cognitive signals into localized data traps. Once detected, the source IP signature is propagated globally across cybercommand nodes.\n\nFIREWALL INSTRUCTIONS:\nRun the command 'launch cyber_defense' from the deck console to engage multi-factor filtering profiles instantly."
  }
];

export const KnowledgeBase: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const filteredArticles = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const handleOpenArticle = (art: Article) => {
    audio.playSweep();
    setSelectedArticle(art);
  };

  const handleCloseArticle = () => {
    audio.playClick();
    setSelectedArticle(null);
  };

  return (
    <div className="h-full flex flex-col justify-between text-neon-cyan">
      
      {/* Immersive Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-cyber-black/95 backdrop-blur-md z-50 p-6 flex items-center justify-center animate-flicker">
          <div className="crt-overlay" />
          <div className="crt-scanline" />
          
          <div className="w-full max-w-3xl cyber-panel border-2 border-neon-cyan p-6 rounded bg-cyber-black flex flex-col max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-neon-cyan pb-3 mb-4">
              <div>
                <span className={`text-[10px] px-2 py-0.5 font-bold uppercase rounded ${selectedArticle.classification === 'SECRET' ? "bg-neon-pink text-black" : "bg-neon-purple text-white"}`}>
                  {selectedArticle.classification} INTEL
                </span>
                <h2 className="font-orbitron font-bold text-base mt-2 text-neon-cyan">{selectedArticle.title}</h2>
                <div className="text-[10px] font-mono opacity-60 mt-1">CAT: {selectedArticle.category} | DECK_ID: {selectedArticle.id}</div>
              </div>
              <button 
                onClick={handleCloseArticle}
                className="p-1 border border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/15 rounded text-neon-cyan transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full bg-cyber-dark/80 rounded border border-neon-cyan/20 p-4 mb-4 flex justify-center items-center">
              {selectedArticle.diagram}
            </div>

            <div className="font-mono text-xs leading-relaxed text-slate-350 whitespace-pre-wrap flex-1 overflow-y-auto max-h-[260px] pr-2 scrollbar-thin">
              {selectedArticle.content}
            </div>

            <div className="border-t border-neon-cyan/25 pt-4 mt-4 flex justify-between items-center text-xs font-mono opacity-60">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-neon-cyan" />
                CLASSIFIED DECK ACCESS ACTIVE
              </span>
              <span>CONFIDENTIAL - CORE NODE 77</span>
            </div>
          </div>
        </div>
      )}

      {/* Main portal layout */}
      <div>
        <div className="flex justify-between items-center border-b border-neon-cyan/20 pb-2 mb-3">
          <h3 className="font-orbitron font-bold tracking-wider text-xs flex items-center gap-2">
            <FileText className="w-4 h-4 text-neon-cyan" />
            CLASSIFIED INTELLIGENCE PORTAL
          </h3>
          <span className="text-[9px] font-mono opacity-50 uppercase font-bold text-neon-green">Security Archives</span>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                audio.playClick();
              }}
              className={`text-[9px] font-mono px-2.5 py-1 rounded border transition ${activeCategory === cat ? "bg-neon-cyan/15 border-neon-cyan text-neon-cyan" : "border-neon-cyan/10 hover:border-neon-cyan/40 text-slate-400"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredArticles.map(art => (
            <div 
              key={art.id}
              className="cyber-panel p-4 flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-dark/40 hover:border-neon-cyan/60 transition duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-mono opacity-40">{art.id}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${art.classification === 'SECRET' ? "bg-neon-pink/20 text-neon-pink" : "bg-neon-purple/20 text-neon-cyan"}`}>
                    {art.classification}
                  </span>
                </div>
                <h4 className="font-orbitron font-bold text-xs text-neon-cyan leading-snug mb-2">{art.title}</h4>
                <p className="font-mono text-[10px] opacity-75 leading-relaxed">{art.summary}</p>
              </div>

              <button 
                onClick={() => handleOpenArticle(art)}
                className="mt-4 w-full cyber-btn text-[9px] py-1 flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                DECRYPT REPORT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

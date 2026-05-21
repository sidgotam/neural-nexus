import React, { useEffect, useState, useRef } from 'react';
import { audio } from '../utils/audio';

const BOOT_LINES = [
  "Booting Neural Nexus Operating System...",
  "Initializing Quantum AI Core...",
  "Connecting Underground Intelligence Grid...",
  "Bypassing Global Firewalls...",
  "Accessing Encrypted Archives...",
  "Launching Neural Defense Protocols...",
  "Satellite Link Established...",
  "AI Consciousness Activated...",
  "Welcome Back, Operator."
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [stage, setStage] = useState<'static' | 'typing' | 'authorized'>('static');
  const [flickerClass, setFlickerClass] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Initial CRT Static Noise phase
  useEffect(() => {
    // Generate organic static clicks
    const noiseInterval = setInterval(() => {
      audio.playClick();
      // Random glitch flickers
      if (Math.random() > 0.7) {
        setFlickerClass("opacity-30 translate-x-[4px] hue-rotate-90");
        setTimeout(() => setFlickerClass(""), 60);
      }
    }, 180);

    const timer = setTimeout(() => {
      clearInterval(noiseInterval);
      setStage('typing');
    }, 2200);

    return () => {
      clearInterval(noiseInterval);
      clearTimeout(timer);
    };
  }, []);

  // 2. Typing out the custom hacker BIOS logs
  useEffect(() => {
    if (stage !== 'typing') return;

    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < BOOT_LINES.length) {
        const nextLine = BOOT_LINES[lineIdx];
        setLines(prev => [...prev, nextLine]);
        audio.playClick();
        lineIdx++;

        // Glitch on final lines
        if (lineIdx === BOOT_LINES.length) {
          setFlickerClass("invert hue-rotate-180");
          setTimeout(() => setFlickerClass(""), 120);
        }
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStage('authorized');
          audio.playBeep(980, 0.25);
          setTimeout(() => audio.playBeep(1470, 0.25), 150);
        }, 800);
      }
    }, 4500 / BOOT_LINES.length); // Dynamic spacing over 4.5 seconds

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleEnter = () => {
    audio.setMute(false); // Enable global audio
    onComplete();
  };

  return (
    <div className={`min-h-screen bg-cyber-black text-neon-green font-mono p-6 flex flex-col justify-between items-center relative overflow-hidden select-none transition-all duration-300 ${flickerClass}`}>
      {/* Immersive CRT & Static scanlines */}
      <div className="crt-overlay" />
      <div className="crt-scanline" />
      
      {/* Background cyber grid */}
      <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none" />

      {/* Top operational telemetry header */}
      <div className="w-full max-w-4xl border-b border-neon-green/20 pb-4 mb-4 flex justify-between items-center text-[10px] tracking-widest opacity-60">
        <div>SYS_DECK: N-NEXUS_v9.9.2</div>
        <div>UPLINK_GRID: SECURITY_ROOM_77</div>
        <div>DATETIME: {new Date().toISOString().replace('T', ' ').substring(0, 19)}</div>
      </div>

      {/* Main static / logs center container */}
      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-start px-4 font-mono">
        {stage === 'static' ? (
          <div className="w-full text-center space-y-4 animate-pulse">
            <div className="text-[28px] font-orbitron font-extrabold text-neon-green tracking-[0.4em] uppercase drop-shadow-[0_0_12px_#00FFAA]">
              DECK ENCRYPTED
            </div>
            <div className="text-xs tracking-[0.2em] opacity-80 uppercase animate-flicker">
              Establishing dynamic quantum handshake tunnel ...
            </div>
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="w-full flex-1 flex flex-col justify-start items-start font-mono text-sm md:text-base leading-relaxed overflow-y-auto pr-4 py-8 scrollbar-none"
          >
            {lines.map((line, idx) => (
              <div 
                key={idx} 
                className={`w-full flex items-center mb-2 font-mono ${
                  idx === BOOT_LINES.length - 1 
                    ? "text-neon-cyan drop-shadow-[0_0_8px_#00F0FF] font-bold" 
                    : "text-neon-green"
                }`}
              >
                <span className="opacity-30 mr-4 font-mono">[{String(idx + 1).padStart(2, '0')}]</span>
                <span className="font-mono">{line}</span>
              </div>
            ))}
            {stage === 'typing' && (
              <div className="w-2.5 h-4 bg-neon-green animate-pulse ml-2 inline-block" />
            )}
          </div>
        )}
      </div>

      {/* Launch CTA */}
      <div className="w-full max-w-4xl flex flex-col items-center border-t border-neon-green/20 pt-6 min-h-[120px]">
        {stage === 'authorized' ? (
          <div className="flex flex-col items-center animate-flicker">
            <div className="text-neon-cyan text-[10px] font-bold tracking-[0.3em] mb-4 uppercase animate-pulse">
              ❖ SECURE QUANTUM LINK DECRYPTED ❖
            </div>
            <button 
              onClick={handleEnter}
              className="cyber-btn cyber-btn-green cyber-clip px-10 py-4 text-base border-2 hover:scale-105 transform transition duration-300 relative group font-orbitron"
            >
              <span className="absolute inset-0 bg-neon-green/15 opacity-0 group-hover:opacity-100 transition-opacity" />
              ACCESS NEURAL INTERFACE
            </button>
          </div>
        ) : (
          <div className="text-[10px] opacity-45 animate-pulse uppercase tracking-[0.25em] font-mono">
            BYPASSING QUANTUM FIREWALLS & INITIALIZING CHANNELS...
          </div>
        )}
      </div>
    </div>
  );
};

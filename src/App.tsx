import { useState } from 'react';
import { BootSequence } from './components/BootSequence';
import { ThreeCanvas } from './components/ThreeCanvas';
import { MatrixRain } from './components/MatrixRain';
import { Terminal } from './components/Terminal';
import { DeepfakeLab } from './components/DeepfakeLab';
import { GlobalThreatMap } from './components/GlobalThreatMap';
import { AIAssistant } from './components/AIAssistant';
import { KnowledgeBase } from './components/KnowledgeBase';
import { audio } from './utils/audio';
import { Volume2, VolumeX, AlertTriangle, KeyRound, Terminal as TermIcon, ShieldAlert } from 'lucide-react';

const NAV_ITEMS = [
  "HOME",
  "INTELLIGENCE",
  "AI RESEARCH",
  "CYBERSECURITY",
  "DEEPFAKE LAB",
  "NEURAL SYSTEMS",
  "QUANTUM TECH",
  "CONTACT"
];

function App() {
  const [booted, setBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [lockdown, setLockdown] = useState(false);

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audio.setMute(nextMute);
  };

  const handleTerminalCommand = (cmd: string) => {
    if (cmd === 'launch cyber_defense') {
      setLockdown(false);
      setActiveAlert("CYBER DEFENSE SECURE // SYSTEMS NORMALIZED");
      audio.playBeep(900, 0.15);
      setTimeout(() => setActiveAlert(null), 4000);
    } else if (cmd === 'scan neural_network') {
      setActiveAlert("SYNAPTIC NODE SCAN IN PROGRESS... 100% SECURE");
      setTimeout(() => setActiveAlert(null), 4000);
    } else if (cmd === 'decrypt intelligence_protocols') {
      setActiveAlert("RESTRICTED FILES UNLOCKED ON PRIMARY DECK");
      setTimeout(() => setActiveAlert(null), 4000);
    } else if (cmd === 'trigger_lockdown') {
      setLockdown(true);
      setActiveAlert("SYSTEM RED ALERT: LOCKDOWN CONFIRMED");
      audio.playWarning();
    }
  };

  const triggerGlitchEffect = () => {
    audio.playGlitch();
    setActiveAlert("WARNING: NEURAL LINK VOLTAGE SPIKE");
    setTimeout(() => setActiveAlert(null), 2500);
  };

  if (!booted) {
    return (
      <BootSequence 
        onComplete={() => {
          setBooted(true);
          setIsMuted(false);
          audio.setMute(false);
        }} 
      />
    );
  }

  return (
    <div className={`min-h-screen text-neon-cyan font-mono relative overflow-x-hidden p-4 md:p-6 flex flex-col justify-between transition-colors duration-1000 ${
      lockdown ? "bg-red-950/20" : "bg-cyber-black"
    }`}>
      {/* 3D WebGL Background Scene & Matrix Rain */}
      <ThreeCanvas />
      <MatrixRain />

      {/* Screen CRT Overlays */}
      <div className="crt-overlay" />
      <div className="crt-scanline" />

      {/* Floating Holographic Transparent Navigation Bar */}
      <nav className="cyber-panel p-3 flex flex-wrap justify-between items-center border-neon-cyan/25 rounded bg-cyber-black/85 mb-6 sticky top-2 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className={`w-3.5 h-3.5 rounded-full ${lockdown ? "bg-neon-pink animate-ping" : "bg-neon-green animate-pulse"}`} />
          <span className="font-orbitron font-extrabold tracking-widest text-xs md:text-sm text-neon-cyan hover:text-neon-green cursor-pointer transition">
            NEURAL NEXUS // NODE_77
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-wider font-bold">
          {NAV_ITEMS.map((item, idx) => (
            <span 
              key={idx}
              onClick={() => {
                audio.playClick();
                if (item === "DEEPFAKE LAB") {
                  window.scrollTo({ top: 700, behavior: 'smooth' });
                }
              }}
              className="cursor-pointer hover:text-neon-green transition-colors duration-300 relative group py-1"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neon-green group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00FFAA]" />
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 text-[9px] font-mono border border-neon-cyan/30 hover:border-neon-cyan px-2.5 py-1 rounded bg-cyber-dark/65 hover:bg-neon-cyan/15 transition"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neon-pink animate-pulse" />
                <span className="text-neon-pink">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-neon-green" />
                <span className="text-neon-green">AUDIO ON</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Primary Cinematic Hero Title Area */}
      <section className="flex flex-col items-center justify-center text-center my-8 md:my-14 relative z-10">
        
        {/* Layered Glitchy Typography */}
        <h1 
          onClick={triggerGlitchEffect}
          className="font-orbitron font-black text-4xl sm:text-6xl md:text-8xl tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple cursor-pointer select-none hover:scale-102 transform transition duration-500 drop-shadow-[0_0_15px_rgba(0,240,255,0.65)] animate-hologram"
        >
          NEURAL NEXUS
        </h1>

        {/* Dynamic Projector Subtitle */}
        <p className="font-orbitron font-bold text-xs sm:text-sm tracking-[0.4em] text-neon-green uppercase mt-3 mb-8 drop-shadow-[0_0_8px_rgba(0,255,170,0.5)]">
          UNDERGROUND AI INTELLIGENCE NETWORK
        </p>

        {/* Dynamic Security Warnings Banner */}
        {activeAlert && (
          <div className={`mb-8 px-5 py-2 border rounded text-xs animate-pulse flex items-center gap-2.5 font-mono font-black ${
            lockdown 
              ? "border-neon-pink bg-neon-pink/20 text-neon-pink shadow-[0_0_15px_#FF0066]" 
              : "border-neon-green bg-neon-green/10 text-neon-green shadow-[0_0_12px_#00FFAA]"
          }`}>
            <AlertTriangle className="w-4 h-4 animate-spin" />
            {activeAlert}
          </div>
        )}

        {/* Massive Military-Grade Cyber Buttons */}
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
          <button 
            onClick={() => {
              audio.playSweep();
              window.scrollTo({ top: 500, behavior: 'smooth' });
            }}
            className="cyber-btn cyber-clip px-6 py-3.5 text-xs sm:text-sm border-2 hover:scale-105 transform transition duration-300 relative group flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-neon-cyan/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <KeyRound className="w-4 h-4" />
            ENTER THE GRID
          </button>

          <button 
            onClick={() => {
              audio.playGlitch();
              window.scrollTo({ top: 900, behavior: 'smooth' });
            }}
            className="cyber-btn cyber-btn-pink cyber-clip px-6 py-3.5 text-xs sm:text-sm border-2 hover:scale-105 transform transition duration-300 relative group flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-neon-pink/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldAlert className="w-4 h-4" />
            ACCESS ARCHIVES
          </button>

          <button 
            onClick={() => {
              audio.playBeep(1200, 0.25);
              handleTerminalCommand('trigger_lockdown');
            }}
            className="cyber-btn cyber-btn-green cyber-clip px-6 py-3.5 text-xs sm:text-sm border-2 hover:scale-105 transform transition duration-300 relative group flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-neon-green/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <TermIcon className="w-4 h-4" />
            INITIALIZE LOCKDOWN
          </button>
        </div>
      </section>

      {/* Grid Dashboard Modules */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch z-10 relative">
        
        {/* Left Console shell and threats feeds */}
        <section className="lg:col-span-4 flex flex-col gap-6 h-full min-h-[320px]">
          <div className="flex-1">
            <Terminal onExecuteCommand={handleTerminalCommand} />
          </div>
          <div className="flex-1">
            <GlobalThreatMap />
          </div>
        </section>

        {/* Right Scanners, Core AIs, and Classified intelligence reports */}
        <section className="lg:col-span-8 flex flex-col gap-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <DeepfakeLab />
            </div>
            <div className="md:col-span-2">
              <AIAssistant />
            </div>
          </div>

          <div className="flex-1">
            <KnowledgeBase />
          </div>
        </section>
      </main>

      {/* Meta HUD Footer */}
      <footer className="cyber-panel mt-8 p-3 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono opacity-50 border-neon-cyan/10 bg-cyber-black/85">
        <div>COGNITIVE SHIELDING: SECURED [AES-256]</div>
        <div>STATION NODE: NODE_77_CYBER</div>
        <div>OPERATING FRAME: REACT_VITE_SYS_2099</div>
      </footer>
    </div>
  );
}

export default App;

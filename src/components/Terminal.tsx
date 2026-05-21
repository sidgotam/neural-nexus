import React, { useState, useRef, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Cpu } from 'lucide-react';

interface TerminalProps {
  onExecuteCommand: (cmd: string) => void;
}

const HACKER_FLOW = [
  "scan global_network --deep",
  "analyzing node coordinates...",
  "decrypt classified_protocols",
  "bypassing quantum layers...",
  "launch ai_surveillance",
  "mapping face topologies...",
  "bypass quantum_firewall",
  "injecting proxy headers...",
  "initialize neural_scanner",
  "indexing mind parameters...",
  "analyze deepfake_patterns",
  "evaluating eye-blink rates...",
  "tracking suspicious_activity...",
  "authorizing gateway sectors...",
  "access granted.",
  "root access enabled."
];

export const Terminal: React.FC<TerminalProps> = ({ onExecuteCommand }) => {
  const [history, setHistory] = useState<string[]>([
    "NEURAL NEXUS WARFARE HUD [v9.2-CORE]",
    "DECK_STATUS: ENCRYPTED // PORT: 5173",
    "ENTER 'help' TO DISCOVER RECON TOOLS.",
    ""
  ]);
  const [input, setInput] = useState("");
  const [cpu, setCpu] = useState(48);
  const [ram, setRam] = useState(62);
  const [lockdownActive, setLockdownActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // 1. Dynamic CPU and RAM fluctuation loops
  useEffect(() => {
    const meterInterval = setInterval(() => {
      setCpu(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 11) - 5, 20), 99));
      setRam(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 5) - 2, 40), 95));
    }, 1800);

    return () => clearInterval(meterInterval);
  }, []);

  // 2. Loop automated hacker script lines in background logs
  useEffect(() => {
    let scriptIdx = 0;
    const scriptInterval = setInterval(() => {
      const line = HACKER_FLOW[scriptIdx];
      setHistory(prev => {
        const next = [...prev, `auto-bot@core:~$ ${line}`];
        // Add artificial outcomes to simulated commands
        if (line.includes("access granted")) {
          audio.playBeep(1100, 0.12);
          next.push("  [SUCCESS] ROOT GATE OPENED // NODE SECURE.");
        } else if (line.includes("root access enabled")) {
          audio.playBeep(1400, 0.15);
        } else if (line.includes("tracking")) {
          audio.playWarning();
          next.push("  [ALERT] CYBERATTACK INTRUSION SOURCE IDENTIFIED AT 185.45.22.90");
        }
        return next;
      });

      scriptIdx = (scriptIdx + 1) % HACKER_FLOW.length;
    }, 4000);

    return () => clearInterval(scriptInterval);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    audio.playClick();
    setHistory(prev => [...prev, `operator@nexus:~$ ${input}`]);

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          "SECURITY DECK UTILITIES:",
          "  help                            Display operator instructions",
          "  scan neural_network             Map synaptic connection speeds",
          "  decrypt intelligence_protocols  Parse classified mind archives",
          "  launch cyber_defense            Arm quantum firewall mitigators",
          "  analyze deepfake_video          Inspect biometric profile matrices",
          "  trigger_lockdown                Activate emergency base defense",
          "  clear                           Purge operating buffers"
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'scan neural_network':
        response = [
          "COMMENCING DEEP SYNAPSE SCAN...",
          "  [Core-0xAA]: Tokyo Sector --- 12ms [ONLINE]",
          "  [Core-0xBB]: Geneva Sector --- 9ms  [ONLINE]",
          "  [Core-0xCC]: NY Proxy -------- 165ms [LATENT NODE]",
          "SYNAPSE LATENCY CHECK COMPLETE. STABLE."
        ];
        onExecuteCommand(cmd);
        break;
      case 'decrypt intelligence_protocols':
        response = [
          "RETRIEVING ENCRYPTED INTELLIGENCE DOSSIER...",
          "  Target: MIND_LOCK_BURST.LOG",
          "  IP Trace: 185.45.22.90",
          "  Intrusion Vector: Facial biometric deepfake payload",
          "ARCHIVE PARSING COMPLETED."
        ];
        onExecuteCommand(cmd);
        break;
      case 'launch cyber_defense':
        response = [
          "MITIGATING ACTIVE NODE INTRUSIONS...",
          "  [+] BINDING PORT 5173 TUNNEL FILTERS",
          "  [+] RE-ROUTING GATEWAY CREDENTIALS VIA SWISS RELAYS",
          "  [+] ISOLATING IP HOST: 185.45.22.90",
          "SHIELD ACTIVE. DECK ARMOR INCREASED."
        ];
        onExecuteCommand(cmd);
        break;
      case 'trigger_lockdown':
        setLockdownActive(true);
        audio.playWarning();
        response = [
          "!!! WARNING !!! EMERGENCY BASE LOCKDOWN TRIGGERED !!!",
          "  [!] RE-KEYING COGNITIVE CHANNELS",
          "  [!] DISCONNECTING ORBITAL TELEMETRY",
          "  [!] RED ALERT STATUS CONFIRMED."
        ];
        onExecuteCommand(cmd);
        break;
      default:
        response = [`Command error: '${cmd}' not recognized. Enter 'help' for diagnostics.`];
        audio.playWarning();
        break;
    }

    setTimeout(() => {
      setHistory(prev => [...prev, ...response, ""]);
    }, 100);

    setInput("");
  };

  return (
    <div className={`cyber-panel font-mono text-xs p-4 h-full flex flex-col justify-between overflow-hidden rounded border transition-colors duration-500 ${
      lockdownActive 
        ? "border-neon-pink/60 bg-cyber-black/95 text-neon-pink" 
        : "border-neon-green/20 bg-cyber-black/90 text-neon-green"
    }`}>
      
      {/* Top Console Status */}
      <div className="flex justify-between items-center border-b border-neon-green/20 pb-2 mb-2">
        <span className="flex items-center gap-2 font-mono font-bold tracking-wider">
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${lockdownActive ? "bg-neon-pink" : "bg-neon-green"}`} />
          {lockdownActive ? "RED ALERT SYSTEM LOCKDOWN" : "SECURE CYBER COMMAND UNIT"}
        </span>
        <span className="text-[10px] opacity-60">CONSOLE_NODE: 0x992A</span>
      </div>

      {/* Real-time Hardware Meters */}
      <div className="grid grid-cols-3 gap-2 mb-3 bg-cyber-dark/40 p-2 rounded border border-neon-green/10">
        <div className="flex flex-col">
          <span className="text-[8px] opacity-50 uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3" /> CPU LOAD
          </span>
          <span className="font-bold text-xs">{cpu}%</span>
          <div className="w-full bg-cyber-black h-1 rounded overflow-hidden mt-1">
            <div className="bg-neon-cyan h-full transition-all duration-500" style={{ width: `${cpu}%` }} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[8px] opacity-50 uppercase">RAM COGNITIVE</span>
          <span className="font-bold text-xs">{ram}%</span>
          <div className="w-full bg-cyber-black h-1 rounded overflow-hidden mt-1">
            <div className="bg-neon-purple h-full transition-all duration-500" style={{ width: `${ram}%` }} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[8px] opacity-50 uppercase">PACKETS SYNC</span>
          <span className={`font-bold text-xs ${lockdownActive ? "text-neon-pink animate-pulse" : "text-neon-green"}`}>
            {lockdownActive ? "BLOCKED" : "SECURE"}
          </span>
          <div className="w-full bg-cyber-black h-1 rounded overflow-hidden mt-1">
            <div 
              className={`h-full transition-all ${lockdownActive ? "bg-neon-pink w-full" : "bg-neon-green w-[88%]"}`} 
            />
          </div>
        </div>
      </div>

      {/* Main logs screen */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1 mb-2 max-h-[145px] scrollbar-thin">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={
              line.startsWith("operator@nexus") 
                ? "text-neon-cyan" 
                : line.includes("WARNING") || line.includes("ALERT") || line.includes("error") 
                  ? "text-neon-pink font-bold animate-pulse" 
                  : "text-neon-green/80"
            }
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive terminal input prompt */}
      <form onSubmit={handleCommand} className="flex border-t border-neon-green/20 pt-2 bg-cyber-black/30">
        <span className="text-neon-cyan mr-2 font-mono">operator@nexus:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            audio.playClick();
          }}
          className="flex-1 bg-transparent text-neon-green outline-none border-none caret-neon-green font-mono text-xs"
          placeholder="Enter shell instruction..."
        />
      </form>
    </div>
  );
};

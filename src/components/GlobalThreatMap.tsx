import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Shield, Wifi, Globe } from 'lucide-react';

interface ThreatEvent {
  id: string;
  ip: string;
  location: string;
  target: string;
  type: string;
  severity: 'CRITICAL' | 'WARNING' | 'LOW';
  timestamp: string;
}

const ATTACK_TYPES = [
  "DDoS Intrusion",
  "SQL Injection",
  "Neural Hijacking",
  "Quantum Decrypt",
  "Ransomware Lock",
  "Buffer Overflow",
  "Packet Sniffing"
];

const LOCATIONS = ["Tokyo, JP", "Geneva, CH", "London, UK", "New York, US", "Zurich, CH", "Beijing, CN", "Moscow, RU"];
const TARGETS = ["Secure Core Alpha", "Financial Database", "Cognitive Grid B3", "Orbital Node 04", "Quantum Gateway", "Intelligence Arch-01"];

export const GlobalThreatMap: React.FC = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>([
    {
      id: "THR-1029",
      ip: "185.45.22.90",
      location: "Moscow, RU",
      target: "Financial Database",
      type: "SQL Injection",
      severity: "WARNING",
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: "THR-1030",
      ip: "82.112.9.231",
      location: "Beijing, CN",
      target: "Cognitive Grid B3",
      type: "Neural Hijacking",
      severity: "CRITICAL",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isCritical = Math.random() > 0.65;
      const newThreat: ThreatEvent = {
        id: `THR-${Math.floor(1000 + Math.random() * 9000)}`,
        ip: `${Math.floor(10 + Math.random() * 240)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        target: TARGETS[Math.floor(Math.random() * TARGETS.length)],
        type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
        severity: isCritical ? "CRITICAL" : Math.random() > 0.5 ? "WARNING" : "LOW",
        timestamp: new Date().toLocaleTimeString()
      };

      setThreats(prev => [newThreat, ...prev.slice(0, 6)]);
      
      if (isCritical) {
        audio.playWarning();
      } else {
        audio.playBeep(580, 0.06);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-panel p-4 h-full flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-black/75">
      <div className="flex justify-between items-center border-b border-neon-cyan/20 pb-2 mb-3">
        <h3 className="font-orbitron font-bold tracking-wider text-xs flex items-center gap-2">
          <Globe className="w-4 h-4 text-neon-cyan" />
          GLOBAL THREAT HUD MONITOR
        </h3>
        <span className="text-[10px] font-mono text-neon-green flex items-center gap-1">
          <Wifi className="w-3 h-3 animate-pulse" />
          LIVE UPLINK ACTIVE
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin max-h-[190px]">
        {threats.map(threat => (
          <div 
            key={threat.id}
            className={`p-2 border rounded font-mono text-[11px] flex items-start justify-between transition-all duration-300 ${
              threat.severity === 'CRITICAL' 
                ? "bg-neon-pink/15 border-neon-pink/50 text-neon-pink" 
                : threat.severity === 'WARNING' 
                  ? "bg-neon-purple/10 border-neon-purple/30 text-neon-cyan" 
                  : "bg-cyber-dark/40 border-neon-cyan/15 text-slate-350"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold opacity-45">{threat.id}</span>
                <span className="font-orbitron font-semibold text-xs">{threat.type}</span>
              </div>
              <div className="text-[10px] opacity-75">
                SOURCE: <span className="font-bold">{threat.ip}</span> ({threat.location})
              </div>
              <div className="text-[10px] opacity-75">
                TARGET: <span className="underline">{threat.target}</span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between h-full min-h-[34px]">
              <span className="text-[9px] opacity-50">{threat.timestamp}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                threat.severity === 'CRITICAL'
                  ? "bg-neon-pink text-black"
                  : threat.severity === 'WARNING'
                    ? "bg-neon-purple text-white"
                    : "bg-cyber-gray text-slate-200"
              }`}>
                {threat.severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-neon-cyan/15 pt-3 mt-3 flex justify-between items-center text-[10px] font-mono opacity-65">
        <div className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-neon-green" />
          FIREWALL ACTIVE
        </div>
        <div>
          ATTACKS BLOCKED: 1,492,084
        </div>
      </div>
    </div>
  );
};

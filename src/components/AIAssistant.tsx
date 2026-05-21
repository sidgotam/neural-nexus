import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { Send, Sparkles } from 'lucide-react';

const PRESET_QUESTIONS = [
  "How to scan for deepfakes?",
  "What is neural hijacking?",
  "How to defend Node 0xBF81A?",
  "Tell me about Quantum Cryptography."
];

const ANSWERS: Record<string, string> = {
  "how to scan for deepfakes": "Access the Biometric Deepfake Lab. Choose your target feed, then execute 'RUN BIOMETRIC CHECK'. Our system scans pixel distortions, blink rates, and audio frequencies. If the distortion exceeds 70%, the AI tags the feed as SYNTHETIC DEEPFAKE.",
  "what is neural hijacking": "Neural hijacking is a cyber intrusion vector targeting cognitive implants. Attackers transmit high-frequency signal waveforms to inject malicious memory fragments or bypass neural firewalls. Defend by deploying quantum proxy headers.",
  "how to defend node 0xbf81a": "Node 0xBF81A is vulnerable to quantum decryption attacks. Open the command terminal and type 'launch cyber_defense'. This activates dynamic frequency-hopping filters and blocks intrusion IPs (such as 185.45.22.90).",
  "tell me about quantum cryptography": "Quantum cryptography utilizes the principles of quantum mechanics to secure communications. By encoding data in photon states, any interception attempt alters the quantum superposition, instantly notifying our intrusion detection system."
};

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'operator'; text: string }[]>([
    { sender: 'ai', text: "SYSTEM OPERATIONAL. I am Nexus-AI Core. State your query, operator." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerAIResponse = (userMsg: string) => {
    setIsTyping(true);
    audio.playSweep();

    const sanitizedMsg = userMsg.toLowerCase().replace(/[?.]/g, "").trim();
    const replyText = ANSWERS[sanitizedMsg] || "QUERY NOT FOUND IN RESTRICTED ARCHIVES. State a valid security protocol or select from standard queries.";

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
      
      let charIdx = 0;
      const blipInterval = setInterval(() => {
        if (charIdx < replyText.length) {
          audio.playClick();
          charIdx += 4;
        } else {
          clearInterval(blipInterval);
        }
      }, 50);

    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    audio.playClick();
    setMessages(prev => [...prev, { sender: 'operator', text: input }]);
    const userQuery = input;
    setInput("");
    triggerAIResponse(userQuery);
  };

  const handlePresetClick = (q: string) => {
    if (isTyping) return;
    audio.playClick();
    setMessages(prev => [...prev, { sender: 'operator', text: q }]);
    triggerAIResponse(q);
  };

  return (
    <div className="cyber-panel p-4 h-full flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-black/85">
      <div>
        <div className="flex justify-between items-center border-b border-neon-cyan/20 pb-2 mb-3">
          <h3 className="font-orbitron font-bold tracking-wider text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
            NEXUS-AI CONTEXT ENGINE
          </h3>
          <span className="text-[9px] font-mono opacity-50 uppercase">Active Core</span>
        </div>

        {/* AI Waveform Visualizer */}
        <div className="flex items-center gap-3 p-2 bg-cyber-dark/50 border border-neon-cyan/15 rounded mb-3">
          <div className="w-10 h-10 flex items-center justify-center bg-neon-cyan/10 rounded-full border border-neon-cyan/20">
            <svg className="w-6 h-6 stroke-neon-cyan animate-pulse" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V22M8 5V19M4 9V15M16 6V18M20 10V14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="font-orbitron font-semibold text-xs text-neon-cyan">CORE AVATAR</div>
            <div className="font-mono text-[9px] opacity-60">STATUS: {isTyping ? "PROCESSING SYLLABLES..." : "MONITORING INPUTS"}</div>
          </div>
        </div>

        {/* Message Thread */}
        <div 
          ref={scrollRef}
          className="overflow-y-auto space-y-2 max-h-[140px] pr-1 mb-3 scrollbar-thin font-mono text-[11px]"
        >
          {messages.map((m, idx) => (
            <div key={idx} className={`p-2 rounded ${m.sender === 'ai' ? "bg-neon-cyan/5 border border-neon-cyan/10 text-neon-cyan" : "bg-cyber-gray/20 border border-cyber-gray/40 text-slate-350 self-end"}`}>
              <div className="font-bold text-[9px] opacity-45 uppercase mb-0.5">{m.sender === 'ai' ? "NEXUS-AI" : "OPERATOR"}</div>
              <p className="leading-relaxed">{m.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className="p-2 rounded bg-neon-cyan/5 border border-neon-cyan/10 text-neon-cyan animate-pulse">
              <div className="font-bold text-[9px] opacity-45 uppercase mb-0.5">NEXUS-AI</div>
              <span>THINKING...</span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Preset chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button 
              key={idx}
              disabled={isTyping}
              onClick={() => handlePresetClick(q)}
              className="text-[9px] font-mono border border-neon-cyan/20 hover:border-neon-cyan/60 px-2 py-0.5 rounded bg-cyber-dark/40 text-neon-cyan/80 hover:text-neon-cyan transition duration-300"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type query to AI Core..."
            className="flex-1 bg-cyber-black text-neon-cyan placeholder-neon-cyan/30 text-xs font-mono outline-none border border-neon-cyan/20 focus:border-neon-cyan p-2 rounded"
          />
          <button 
            type="submit"
            disabled={isTyping}
            className="cyber-btn px-3 flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

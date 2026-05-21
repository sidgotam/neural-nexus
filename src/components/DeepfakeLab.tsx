import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Scan, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface MockTarget {
  id: string;
  name: string;
  type: string;
  avatarSvg: React.ReactNode;
  pixelDistortion: number;
  frequencyInvariance: number;
  eyeBlinkRate: number;
  expectedConfidence: number;
  verdict: 'REAL' | 'FAKE';
}

const MOCK_TARGETS: MockTarget[] = [
  {
    id: "TRG-091",
    name: "Senator Arthur Vance",
    type: "Politician / Broadcast feed",
    pixelDistortion: 82,
    frequencyInvariance: 74,
    eyeBlinkRate: 15,
    expectedConfidence: 94.2,
    verdict: 'FAKE',
    avatarSvg: (
      <svg className="w-full h-full stroke-neon-pink" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15C30 15 25 35 25 55C25 75 35 85 50 85C65 85 75 75 75 55C75 35 70 15 50 15Z" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M30 30C40 20 60 20 70 30" strokeWidth="1"/>
        <circle cx="40" cy="45" r="4" strokeWidth="1"/>
        <path d="M40 38V52M33 45H47" strokeWidth="0.5"/>
        <circle cx="60" cy="45" r="4" strokeWidth="1"/>
        <path d="M60 38V52M53 45H67" strokeWidth="0.5"/>
        <path d="M50 45V60H45" strokeWidth="1.5"/>
        <path d="M38 68C42 72 58 72 62 68" strokeWidth="1"/>
        <path d="M35 68H65" strokeWidth="0.5" strokeDasharray="2 2"/>
        <circle cx="50" cy="50" r="28" strokeWidth="0.5" stroke="rgba(255, 0, 102, 0.2)"/>
        <rect x="20" y="38" width="6" height="2" fill="#FF0066" opacity="0.6"/>
        <rect x="74" y="60" width="8" height="1.5" fill="#00F0FF" opacity="0.6"/>
      </svg>
    )
  },
  {
    id: "TRG-404",
    name: "Dr. Elena Rostova",
    type: "AI Researcher / VidCall",
    pixelDistortion: 8,
    frequencyInvariance: 5,
    eyeBlinkRate: 98,
    expectedConfidence: 99.1,
    verdict: 'REAL',
    avatarSvg: (
      <svg className="w-full h-full stroke-neon-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15C32 15 26 33 26 55C26 77 34 85 50 85C66 85 74 77 74 55C74 33 68 15 50 15Z" strokeWidth="1.5"/>
        <rect x="33" y="40" width="14" height="8" rx="2" strokeWidth="1"/>
        <rect x="53" y="40" width="14" height="8" rx="2" strokeWidth="1"/>
        <path d="M47 44H53" strokeWidth="1"/>
        <circle cx="40" cy="44" r="2" fill="#00FFAA"/>
        <circle cx="60" cy="44" r="2" fill="#00FFAA"/>
        <path d="M50 44V58H47" strokeWidth="1"/>
        <path d="M40 68C45 70 55 70 60 68" strokeWidth="1"/>
        <rect x="22" y="12" width="56" height="76" strokeWidth="0.5" stroke="rgba(0, 255, 170, 0.15)"/>
        <path d="M22 25V12H35M65 12H78V25M22 75V88H35M65 88H78V75" strokeWidth="1"/>
      </svg>
    )
  }
];

export const DeepfakeLab: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<MockTarget>(MOCK_TARGETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentMetric, setCurrentMetric] = useState("");

  const handleStartScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    audio.playSweep();
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + Math.floor(Math.random() * 5) + 3;
        
        if (next < 25) setCurrentMetric("LOCKING FACE GRID MESH COORDINATES...");
        else if (next < 50) setCurrentMetric("ANALYZING EYE BLINK FREQUENCIES...");
        else if (next < 75) setCurrentMetric("COMPUTING PIXEL TRANSITION COHERENCE...");
        else if (next < 95) setCurrentMetric("PERFORMING RESIDUAL NOISE SCAN...");
        else setCurrentMetric("COMPLETED BIOMETRIC SCAN.");

        if (Math.random() > 0.45) {
          audio.playClick();
        }

        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          if (selectedTarget.verdict === 'FAKE') {
            audio.playWarning();
          } else {
            audio.playBeep(980, 0.2);
          }
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning, selectedTarget]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full text-neon-cyan">
      
      {/* Target selector */}
      <div className="cyber-panel p-4 flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-dark/40">
        <div>
          <h3 className="font-orbitron font-bold tracking-wider text-xs mb-4 uppercase border-b border-neon-cyan/20 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-neon-cyan" />
            TARGET ACQUISITION
          </h3>

          <div className="space-y-4">
            {MOCK_TARGETS.map(target => (
              <div 
                key={target.id}
                onClick={() => {
                  if (isScanning) return;
                  setSelectedTarget(target);
                  setScanComplete(false);
                  audio.playClick();
                }}
                className={`p-3 border cursor-pointer transition duration-300 ${selectedTarget.id === target.id ? "bg-neon-cyan/10 border-neon-cyan" : "border-neon-cyan/10 hover:border-neon-cyan/40 bg-cyber-dark/30"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] opacity-50">{target.id}</span>
                  <span className={`text-[9px] px-2 py-0.5 font-bold uppercase ${target.verdict === 'FAKE' ? "bg-neon-pink/20 text-neon-pink" : "bg-neon-green/20 text-neon-green"}`}>
                    {target.verdict}
                  </span>
                </div>
                <div className="font-orbitron text-xs font-semibold">{target.name}</div>
                <div className="font-mono text-[10px] opacity-75">{target.type}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 border border-dashed border-neon-cyan/20 rounded text-center bg-cyber-black/30">
            <div className="text-[10px] font-mono opacity-50 mb-2">Simulate Custom Upload</div>
            <button 
              onClick={() => {
                audio.playGlitch();
                alert("Deepfake scanner upload simulation triggered. Mock file loaded.");
              }}
              className="text-[10px] cyber-btn px-4 py-1 border border-neon-cyan/40"
            >
              CHOOSE PORTRAIT
            </button>
          </div>
        </div>

        <button 
          onClick={handleStartScan}
          disabled={isScanning}
          className={`w-full cyber-btn mt-6 flex justify-center items-center gap-2 ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Scan className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "COMPUTING FACIAL MAPPING..." : "RUN BIOMETRIC CHECK"}
        </button>
      </div>

      {/* Hologram Scanner */}
      <div className="cyber-panel p-4 flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-black/60 relative overflow-hidden">
        <h3 className="font-orbitron font-bold tracking-wider text-xs mb-4 uppercase border-b border-neon-cyan/20 pb-2">
          BIOMETRIC SCANNING CORE
        </h3>

        <div className="w-full aspect-square max-w-[200px] mx-auto border border-neon-cyan/20 relative bg-cyber-dark/30 rounded p-4 flex justify-center items-center">
          {selectedTarget.avatarSvg}

          {isScanning && (
            <div 
              className="absolute left-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_12px_#00F0FF] animate-scanline"
              style={{
                top: `${scanProgress}%`,
                animationDuration: '2.2s'
              }}
            />
          )}

          <div className="absolute inset-2 border border-dashed border-neon-cyan/20 pointer-events-none" />
          <div className="absolute top-2 left-2 text-[8px] font-mono opacity-50">FACIAL_RECON_OS</div>
          <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-50">GRID: 884-D4</div>
        </div>

        <div className="mt-4 font-mono text-[10px] text-neon-cyan/80 bg-cyber-dark/60 p-2 rounded border border-neon-cyan/15 min-h-[48px] flex items-center justify-center text-center">
          {isScanning ? (
            <div className="space-y-1">
              <div className="animate-pulse">{currentMetric}</div>
              <div className="text-neon-cyan font-bold">{scanProgress}% COMPLETE</div>
            </div>
          ) : scanComplete ? (
            <div className="text-neon-green font-bold">ANALYSIS READY. VERDICT SYNCED.</div>
          ) : (
            <div className="opacity-50">DEEPFAKE DETECTORS STANDING BY. ENTER COMMAND.</div>
          )}
        </div>
      </div>

      {/* Telemetry and metrics */}
      <div className="cyber-panel p-4 flex flex-col justify-between border-neon-cyan/20 rounded bg-cyber-dark/40">
        <div>
          <h3 className="font-orbitron font-bold tracking-wider text-xs mb-4 uppercase border-b border-neon-cyan/20 pb-2">
            DETAILED TELEMETRY
          </h3>

          <div className="space-y-4 font-mono text-[11px]">
            <div>
              <div className="flex justify-between mb-1 opacity-80">
                <span>Pixel Distortion Index:</span>
                <span>{scanComplete ? `${selectedTarget.pixelDistortion}%` : "--"}</span>
              </div>
              <div className="w-full bg-cyber-black h-1.5 rounded overflow-hidden border border-neon-cyan/10">
                <div 
                  className="bg-neon-pink h-full transition-all duration-1000"
                  style={{ width: scanComplete ? `${selectedTarget.pixelDistortion}%` : '0%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 opacity-80">
                <span>Frequency Invariance:</span>
                <span>{scanComplete ? `${selectedTarget.frequencyInvariance}%` : "--"}</span>
              </div>
              <div className="w-full bg-cyber-black h-1.5 rounded overflow-hidden border border-neon-cyan/10">
                <div 
                  className="bg-neon-purple h-full transition-all duration-1000"
                  style={{ width: scanComplete ? `${selectedTarget.frequencyInvariance}%` : '0%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 opacity-80">
                <span>Eye Blinking Coherence:</span>
                <span>{scanComplete ? `${selectedTarget.eyeBlinkRate}%` : "--"}</span>
              </div>
              <div className="w-full bg-cyber-black h-1.5 rounded overflow-hidden border border-neon-cyan/10">
                <div 
                  className="bg-neon-green h-full transition-all duration-1000"
                  style={{ width: scanComplete ? `${selectedTarget.eyeBlinkRate}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-neon-cyan/20 p-4 rounded bg-cyber-black/50">
          <div className="text-[9px] font-mono opacity-50 mb-1 uppercase">VERDICT METRIC SUMMARY</div>
          {scanComplete ? (
            <div className="flex items-center gap-3">
              {selectedTarget.verdict === 'FAKE' ? (
                <>
                  <ShieldAlert className="w-8 h-8 text-neon-pink animate-pulse" />
                  <div>
                    <div className="font-orbitron font-bold text-neon-pink text-xs uppercase">DEEPFAKE DETECTED</div>
                    <div className="text-[10px] font-mono opacity-80">
                      Confidence Level: <span className="text-neon-pink font-bold">{selectedTarget.expectedConfidence}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-8 h-8 text-neon-green" />
                  <div>
                    <div className="font-orbitron font-bold text-neon-green text-xs uppercase">REAL BIOMETRIC MATCH</div>
                    <div className="text-[10px] font-mono opacity-80">
                      Authenticity Level: <span className="text-neon-green font-bold">{selectedTarget.expectedConfidence}%</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-2 font-mono text-[10px] opacity-45">
              Launch scan check to update target diagnostic cache.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

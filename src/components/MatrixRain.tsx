import React, { useEffect, useRef } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters from cyberpunk future
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1029884CYBERNEXUSSYSTEM%";
    const charArray = chars.split("");

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Array to track drop locations
    let drops: number[] = Array(columns).fill(1);

    // Track mouse coordinates for dynamic disruption splashes
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      // Semi-transparent overlay to create trailing fade effect
      ctx.fillStyle = "rgba(2, 2, 8, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Cyber green/cyan dual tones
      for (let i = 0; i < drops.length; i++) {
        // Pick random glyph
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Base X and Y positions
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interaction check: mouse coordinate proximity disrupts the rain drops
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 85) {
          // Glow pink when mouse disrupts
          ctx.fillStyle = "#FF0066";
          ctx.font = `bold ${fontSize + 2}px monospace`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#FF0066";
        } else {
          // Glowing matrix cyber-green / cyan
          ctx.fillStyle = Math.random() > 0.85 ? "#00F0FF" : "#00FFAA";
          ctx.font = `${fontSize}px monospace`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset to top or continue down
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Fast fall speed
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none opacity-20"
    />
  );
};

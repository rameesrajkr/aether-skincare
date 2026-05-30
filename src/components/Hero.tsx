import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position (normalized from -0.5 to 0.5)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics for weighted, luxurious movement
  const springConfig = { damping: 30, stiffness: 60, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 1. Bottle Transforms (Primary Focal Point)
  const bottleX = useTransform(smoothX, [0, 1], [-25, 25]);
  const bottleY = useTransform(smoothY, [0, 1], [-18, 18]);
  const bottleRotateY = useTransform(smoothX, [0, 1], [-8, 8]);
  const bottleRotateX = useTransform(smoothY, [0, 1], [6, -6]);

  // 2. Typography Transforms (Deeper Layer - Slower)
  const typoX = useTransform(smoothX, [0, 1], [-15, 15]);
  const typoY = useTransform(smoothY, [0, 1], [-10, 10]);

  // 3. Shadow Shifts (Opposite to Movement)
  const shadowX = useTransform(smoothX, [0, 1], [30, -30]);
  const shadowY = useTransform(smoothY, [0, 1], [20, -20]);
  const shadowBlur = useTransform(smoothY, [0, 1], [15, 25]);

  // Handle Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-hero-bg flex items-center justify-center perspective-[1400px]"
    >
      {/* 1. Background Grain & Atmospheric Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 gradient-editorial opacity-40" />
        <motion.div 
          style={{ 
            x: typoX, 
            y: typoY,
            background: 'radial-gradient(circle at 50% 50%, rgba(217,195,186,0.25) 0%, transparent 70%)'
          }}
          className="absolute inset-0 opacity-40 mix-blend-soft-light" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* 2. Oversized Background Typography (Layered behind product) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.div 
          style={{ x: typoX, y: typoY }}
          className="flex flex-col items-center justify-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 1.05 }}
            animate={{ opacity: 0.22, y: 0, scale: 1.25 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[26vw] md:text-[24vw] font-serif text-hero-text leading-[0.6] tracking-tighter"
          >
            PEAR
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 1.1 }}
            animate={{ opacity: 0.18, x: 0, scale: 1.2 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-[22vw] md:text-[20vw] font-serif text-hero-text leading-[1] tracking-tighter md:ml-[15vw]"
          >
            SERUM
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 0.28, y: 0, scale: 1.2 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="text-[24vw] md:text-[22vw] font-serif italic text-hero-text leading-[0.6] tracking-tight md:ml-[-10vw] mix-blend-multiply"
          >
            ÆTHER
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Centered Floating Product Bottle (Responsive Layer) */}
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-20 w-full max-w-xl px-4 flex justify-center items-center"
      >
        <motion.div
          style={{ 
            x: bottleX, 
            y: bottleY, 
            rotateX: bottleRotateX, 
            rotateY: bottleRotateY,
            perspective: 1400
          }}
          animate={{ 
            translateY: [0, -10, 0],
          }}
          transition={{ 
            translateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.03 }}
          className="relative group cursor-pointer will-change-transform"
        >
          {/* Main Product Image */}
          <div className="relative aspect-[1/2.2] w-56 md:w-64 lg:w-72 overflow-visible">
            <img 
              src="https://drive.google.com/thumbnail?id=1pnMTuM2HQcWh5DNrhNOYRq9OCIsTaLWo&sz=w1200" 
              alt="ÆTHER Pear Serum" 
              className="w-full h-full object-contain brightness-[1.05] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Cinematic Dynamic Shadow */}
          <motion.div 
            style={{ 
              x: shadowX, 
              y: shadowY,
              filter: `blur(20px)`,
              opacity: 0.3
            }}
            animate={{ 
              scale: [0.9, 1, 0.9],
            }}
            transition={{ 
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-espresso/40 rounded-full pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* 4. Hero Content / CTA (Layered Top) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-12 md:p-24 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="space-y-6"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-hero-text font-bold">THE RITUAL</p>
            <h2 className="text-3xl md:text-5xl font-serif text-espresso max-w-sm leading-tight italic">
              Where glow becomes ritual
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-end gap-8 pointer-events-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              className="pill-button pill-button-primary bg-hero-text text-ivory hover:bg-espresso flex items-center gap-4 group shadow-md"
            >
              Explore Ritual
              <span className="w-12 h-[1px] bg-white group-hover:w-16 transition-all" />
            </motion.button>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso/40 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-espresso/10" />
              Minimal Skincare
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* 5. Scroll Interaction Detail */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-espresso/30">Scroll</span>
        <motion.div 
          animate={{ height: [24, 48, 24] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-espresso/40 to-transparent" 
        />
      </motion.div>
    </section>
  );
}

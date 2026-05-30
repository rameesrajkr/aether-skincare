import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import React, { useRef } from 'react';

export default function RitualSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 30);
    mouseY.set((clientY / innerHeight - 0.5) * 30);
  };

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const driftX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Split Tonal Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#F4EEE4]" />
        <div className="w-1/2 h-full bg-[#EAE0D3]" />
      </div>

      {/* Atmospheric Lighting Bloom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,245,235,0.7) 0%, transparent 70%)'
        }}
      />

      {/* Giant Faded Background Typography */}
      <motion.div 
        style={{ x: driftX }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none whitespace-nowrap opacity-[0.08] select-none"
      >
        <span className="text-[40vw] font-serif uppercase tracking-tighter text-[#C3A587]">
          Ritual
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10 px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          
          {/* Editorial Typography Side */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
                  The Ritual — 02
                </span>
                <span className="h-[1px] w-24 bg-[#8A947D]/20" />
              </div>

              <h2 className="text-[clamp(50px,12vw,160px)] font-serif text-[#241F1A] leading-[0.85] tracking-[-0.04em] mb-16">
                Skincare <br />
                without <br />
                <span className="italic text-[#8A947D] ml-0 md:ml-32 block md:inline-block">complication.</span>
              </h2>

              <div className="max-w-md ml-0 md:ml-32">
                <p className="text-xl text-[#6A625A] leading-relaxed font-light mb-12">
                  Minimal formulations crafted to nourish the skin barrier and 
                  elevate everyday rituals into moments of intentional restoration.
                </p>
                
                <div className="h-[1px] w-full bg-[#241F1A]/10 mb-8" />
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#8A947D] font-bold">
                  <span>Balance</span>
                  <span>/</span>
                  <span>Hydration</span>
                  <span>/</span>
                  <span>Radiance</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Art-Directed Product Composition */}
          <div className="w-full lg:w-2/5 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/5] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#EAE0D3]/50 rounded-full blur-3xl opacity-50 scale-75" />
              
              {/* Product Image Stage */}
              <motion.div 
                style={{ 
                  x: smoothMouseX,
                  y: smoothMouseY
                }}
                className="relative z-10 w-[95%] h-[95%] flex items-center justify-center scale-110"
              >
                <motion.div
                  animate={{ 
                    y: [-12, 12, -12],
                    rotate: [-0.5, 0.5, -0.5]
                  }}
                  transition={{ 
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Soft atmospheric lighting bloom behind product */}
                  <div className="absolute inset-0 bg-[rgba(255,245,235,0.45)] rounded-full blur-[80px] scale-75 pointer-events-none" />
                  
                  <img 
                    src="images/tube1.png" 
                    alt="Serum product" 
                    className="w-full h-full object-contain filter drop-shadow-[0_40px_70px_rgba(40,30,20,0.15)] transition-transform duration-700 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Aesthetic Detail: Thin floating divider */}
                  <div className="absolute -right-8 top-1/4 h-[1px] w-24 bg-[#241F1A]/10 hidden lg:block" />
                  <div className="absolute -left-12 bottom-1/3 h-[1px] w-32 bg-[#241F1A]/10 hidden lg:block" />
                </motion.div>
              </motion.div>

              {/* Floating label overlay */}
         
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#241F1A]/[0.03]" />
    </section>
  );
}

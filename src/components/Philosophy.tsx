import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import React, { useRef, useEffect } from 'react';

export default function Philosophy() {
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
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  const imgY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const driftX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Parallax offsets for independent reaction
  const parallaxX1 = useTransform(smoothMouseX, (v) => v * 0.5);
  const parallaxY1 = useTransform(smoothMouseY, (v) => v * 0.5);
  const parallaxX2 = useTransform(smoothMouseX, (v) => v * 1.2);
  const parallaxY2 = useTransform(smoothMouseY, (v) => v * 1.2);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-32 md:py-48 bg-[#F4EEE4] overflow-hidden"
    >
      {/* Editorial Depth Layer */}
      <motion.div 
        style={{ x: driftX }}
        className="absolute bottom-10 left-0 whitespace-nowrap pointer-events-none select-none opacity-[0.05]"
      >
        <span className="text-[20vw] font-serif uppercase tracking-tighter text-[#C3A587]">
          Pure Essence
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
                  Modern Apothecary
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

          <div className="w-full lg:w-2/5 relative pt-20">
            <div className="relative">
              {/* Primary Image: Floating Campaign Photography */}
              <motion.div 
                style={{ 
                  y: imgY1,
                  x: parallaxX1,
                }}
                className="relative z-10 w-full aspect-[3/4] flex items-center justify-center scale-110"
              >
                <motion.div
                  animate={{ 
                    y: [-12, 12, -12],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Soft atmospheric lighting bloom behind product */}
                  <div className="absolute inset-x-0 inset-y-0 bg-[rgba(255,245,235,0.45)] rounded-full blur-[80px] scale-110 pointer-events-none" />
                  
                  <img 
                     src="https://drive.google.com/thumbnail?id=1b6MS1G8IrweVIVDOCp_nrWEP_yUxvijA&sz=w1200" 
                     alt="Product Aesthetic" 
                     className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(40,30,20,0.15)] transition-transform duration-700 hover:scale-[1.02]"
                     referrerPolicy="no-referrer"
                   />
                </motion.div>
              </motion.div>

              {/* Atmospheric lighting accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C3A587]/15 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Asymmetrical grid decorative elements */}
      <div className="absolute left-0 top-1/4 h-[1px] w-48 bg-[#241F1A]/5" />
      <div className="absolute left-24 top-0 bottom-0 w-[1px] bg-[#241F1A]/[0.02]" />
    </section>
  );
}

import { motion, useScroll, useTransform, useAnimationControls } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Cleanse",
    copy: "Begin by removing impurities with our oil-to-milk Botanical Cleansing Gel.",
    image: "https://drive.google.com/thumbnail?id=1yyj6VWLTmu4oQMCmVBcaVGg-2LjsMBHU&sz=w1200"
  },
  {
    step: "02",
    title: "Treat",
    copy: "Apply the Vitamin C Serum to damp skin for deep antioxidant protection.",
    image: "https://drive.google.com/thumbnail?id=1bYK5zCoGm-sI0XNeyNOs6g_HPJm4dkiA&sz=w1200"
  },
  {
    step: "03",
    title: "Hydrate",
    copy: "Seal in nutrients and repair the barrier with our luxurious Recovery Cream.",
    image: "https://drive.google.com/thumbnail?id=15Yg5kXyRKUaakXcek1pgVnHZOOT0j9N5&sz=w1200"
  },
  {
    step: "04",
    title: "Protect",
    copy: "Never skip environmental protection. Apply SPF as your final morning step.",
    image: "https://drive.google.com/thumbnail?id=1xrlelRyhjm7SDpaech2XB_08qd9hWR2k&sz=w1200"
  },
  {
    step: "05",
    title: "Regenerate",
    copy: "Optimize cellular renewal with our concentrated Molecular Night Serum.",
    image: "https://drive.google.com/thumbnail?id=1pnMTuM2HQcWh5DNrhNOYRq9OCIsTaLWo&sz=w1200"
  }
];

// Triplicating steps for seamless infinite loop behavior
const INFINITE_STEPS = [...STEPS, ...STEPS, ...STEPS];

export default function RoutineSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardWidth, setCardWidth] = useState(450);
  
  const controls = useAnimationControls();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const driftX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const GAP = 48; // gap-12 = 48px
  const OFFSET_PER_SLIDE = cardWidth + GAP;
  const SET_WIDTH = STEPS.length * OFFSET_PER_SLIDE;
  const TOTAL_DURATION = 45; // Slow luxury loop

  // Update card width based on viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardWidth(340);
      } else {
        setCardWidth(450);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAnimation = useCallback(async (currentX = 0) => {
    // Ensure we are working with negative values for the track position
    const normalizedX = (currentX % SET_WIDTH);
    
    // We want to animate from current position to -(SET_WIDTH)
    const remainingDistance = SET_WIDTH + normalizedX;
    const remainingDuration = (remainingDistance / SET_WIDTH) * TOTAL_DURATION;

    await controls.start({
      x: -SET_WIDTH,
      transition: {
        duration: remainingDuration,
        ease: "linear"
      }
    });

    // Reset snap
    controls.set({ x: 0 });
    startAnimation(0);
  }, [controls, SET_WIDTH, TOTAL_DURATION]);

  const handleNext = async () => {
    if (trackRef.current) {
      const style = window.getComputedStyle(trackRef.current);
      const matrix = new WebKitCSSMatrix(style.transform);
      const currentX = matrix.m41;
      
      const targetX = Math.floor((currentX - OFFSET_PER_SLIDE) / OFFSET_PER_SLIDE) * OFFSET_PER_SLIDE;
      
      controls.stop();
      await controls.start({ 
        x: targetX, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
      });
      
      if (!isPaused) startAnimation(targetX);
    }
  };

  const handlePrev = async () => {
    if (trackRef.current) {
      const style = window.getComputedStyle(trackRef.current);
      const matrix = new WebKitCSSMatrix(style.transform);
      const currentX = matrix.m41;
      
      const targetX = Math.ceil((currentX + OFFSET_PER_SLIDE) / OFFSET_PER_SLIDE) * OFFSET_PER_SLIDE;
      
      controls.stop();
      await controls.start({ 
        x: targetX, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
      });
      
      if (!isPaused) startAnimation(targetX);
    }
  };

  useEffect(() => {
    controls.set({ x: 0 });
    startAnimation(0);
  }, [startAnimation, controls, SET_WIDTH]); // Re-run when width changes

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      if (trackRef.current) {
        const style = window.getComputedStyle(trackRef.current);
        const matrix = new WebKitCSSMatrix(style.transform);
        const currentX = matrix.m41;
        startAnimation(currentX);
      } else {
        startAnimation(0);
      }
    }
  }, [isPaused, controls, startAnimation]);

  useEffect(() => {
    let animationFrame: number;
    const updateProgress = () => {
      if (trackRef.current) {
        const style = window.getComputedStyle(trackRef.current);
        const matrix = new WebKitCSSMatrix(style.transform);
        const currentX = Math.abs(matrix.m41);
        const p = (currentX % SET_WIDTH) / SET_WIDTH * 100;
        setProgress(p);
      }
      animationFrame = requestAnimationFrame(updateProgress);
    };
    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [SET_WIDTH]);

  return (
    <section 
      ref={containerRef}
      className="relative py-48 bg-[#EAE0D3] overflow-hidden"
    >
      <motion.div 
        style={{ x: driftX }}
        className="absolute top-20 right-0 whitespace-nowrap pointer-events-none select-none opacity-[0.05]"
      >
        <span className="text-[25vw] font-serif uppercase tracking-tighter text-[#C3A587]">
          The Guide
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
                The Sequence
              </span>
              <span className="h-[1px] w-24 bg-[#8A947D]/20" />
            </div>

            <h2 className="text-[clamp(50px,8vw,120px)] font-serif text-[#241F1A] leading-[0.85] tracking-[-0.03em] italic">
              The Ritual <br />
              <span className="ml-0 md:ml-48 text-[#8A947D]">Guide.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-[#241F1A]/10 flex items-center justify-center hover:bg-[#241F1A] hover:text-[#EAE0D3] transition-all duration-500 group"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-[#241F1A]/10 flex items-center justify-center hover:bg-[#241F1A] hover:text-[#EAE0D3] transition-all duration-500 group"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex gap-12 will-change-transform"
          style={{ width: `${INFINITE_STEPS.length * OFFSET_PER_SLIDE}px` }}
        >
          {INFINITE_STEPS.map((step, idx) => {
            return (
              <motion.div
                key={`${step.step}-${idx}`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-[340px] md:w-[450px] shrink-0 group select-none opacity-[0.96] hover:opacity-100 transition-opacity"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-12 shadow-[0_24px_60px_rgba(40,30,20,0.12)] bg-[#D9D1C5]">
                  <motion.img 
                    src={step.image} 
                    alt={step.title} 
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      y: {
                        duration: 6 + (idx % 3),
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="w-full h-full object-cover scale-110 brightness-[0.98]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-10 left-10 overflow-hidden">
                    <span className="block text-7xl font-serif italic text-white/90">
                      {step.step}
                    </span>
                  </div>

                  <div className="absolute top-10 right-10">
                     <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8A947D]" />
                     </div>
                  </div>
                </div>

                <div className="pl-4">
                  <h3 className="text-3xl font-serif mb-4 italic text-[#241F1A] group-hover:text-[#8A947D] transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-[#6A625A] leading-relaxed text-base font-light max-w-[320px]">
                    {step.copy}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}



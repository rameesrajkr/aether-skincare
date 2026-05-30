import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const INGREDIENTS = [
  {
    name: "Ceramides",
    desc: "Naturally occurring lipids that lock in moisture and protect against environmental damage.",
    image: "https://drive.google.com/thumbnail?id=1nNHCV_RzDeWVnrtNgBuTb-jMKUv05guv&sz=w1200"
  },
  {
    name: "Niacinamide",
    desc: "A versatile B3 vitamin that refines texture, minimizes pores, and supports the skin barrier.",
    image: "https://drive.google.com/thumbnail?id=14U3d--JjAK-Wlr1_t9DwZ5SFIuJSKQTz&sz=w1200"
  },
  {
    name: "Centella",
    desc: "Known as 'tiger grass,' this botanical powerhouse calms inflammation and speeds healing.",
    image: "https://drive.google.com/thumbnail?id=1Z_Nzj5HHRmm1CgftYwtNb_KWPZ_EnIEB&sz=w1200"
  }
];

export default function IngredientSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const driftX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-48 bg-[#F4EEE4] overflow-hidden"
    >
      {/* Background Depth */}
      <motion.div 
        style={{ x: driftX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.06]"
      >
        <span className="text-[30vw] font-serif uppercase tracking-tighter text-[#C3A587]">
          Scientific
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="lg:w-2/3"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
                Scientific Purity
              </span>
              <span className="h-[1px] w-24 bg-[#8A947D]/20" />
            </div>

            <h2 className="text-[clamp(50px,10vw,140px)] font-serif text-[#241F1A] leading-[0.85] tracking-[-0.03em]">
              Grounded in science, <br />
              <span className="italic text-[#8A947D] ml-0 md:ml-32">inspired by nature.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="lg:w-1/3 pt-12 md:pt-32"
          >
            <p className="text-xl text-[#6A625A] leading-relaxed font-light mb-8 max-w-sm">
              Every ingredient is selected for its clinical efficacy and gentle profile, 
              ensuring results without compromise to the skin barrier.
            </p>
            <div className="w-24 h-[1px] bg-[#8A947D]/30" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {INGREDIENTS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="bg-[#EAE0D3]/30 backdrop-blur-sm p-12 group transition-all duration-700 border border-[#241F1A]/5 relative overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden mb-12 relative shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 brightness-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-serif text-[#241F1A] mb-6 italic group-hover:text-[#8A947D] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[#6A625A] text-base leading-relaxed font-light mb-10">
                  {item.desc}
                </p>
                <div className="h-[1px] w-0 group-hover:w-full bg-[#8A947D]/40 transition-all duration-700" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 text-[8vw] font-serif italic text-black/[0.03] select-none pointer-events-none group-hover:opacity-0 transition-opacity">
                {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-[#241F1A]/[0.02]" />
    </section>
  );
}

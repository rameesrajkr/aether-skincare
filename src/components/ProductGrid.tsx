import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: "Barrier Repair Cream",
    price: "$48",
    tags: ["Hydrate", "Calm"],
    image: "https://drive.google.com/thumbnail?id=1xrlelRyhjm7SDpaech2XB_08qd9hWR2k&sz=w1200",
    size: "large",
    delay: 0.1
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: "$62",
    tags: ["Brighten", "Protect"],
    image: "https://drive.google.com/thumbnail?id=15Yg5kXyRKUaakXcek1pgVnHZOOT0j9N5&sz=w1200",
    size: "small",
    delay: 0.3
  },
  {
    id: 3,
    name: "Botanical Cleansing Gel",
    price: "$34",
    tags: ["Purify", "Gentle"],
    image: "https://drive.google.com/thumbnail?id=11btYuV4v8e2BWkgK8uykNf500NLI8Y7E&sz=w1200",
    size: "medium",
    delay: 0.2
  },
  {
    id: 4,
    name: "Overnight Mask",
    price: "$54",
    tags: ["Recover", "Glow"],
    image: "https://drive.google.com/thumbnail?id=1-_OqBelj69SC2r8cdfg9E1-M3WkAAshy&sz=w1200",
    size: "large",
    delay: 0.4
  }
];

export default function ProductGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const driftX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      className="relative py-48 bg-[#EAE0D3] overflow-hidden"
    >
      {/* Background Depth */}
      <motion.div 
        style={{ x: driftX }}
        className="absolute top-1/4 right-0 whitespace-nowrap pointer-events-none select-none opacity-[0.04]"
      >
        <span className="text-[20vw] font-serif uppercase tracking-tighter text-[#C3A587]">
          The Collection
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
           >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">The Essentials</span>
                <span className="h-[1px] w-24 bg-[#8A947D]/20" />
              </div>
              <h2 className="text-[clamp(40px,8vw,110px)] font-serif text-[#241F1A] leading-[0.9] tracking-[-0.03em] italic">
                Essential <br />
                Formulations.
              </h2>
           </motion.div>
           
           <button className="group relative py-2 overflow-hidden text-[11px] uppercase tracking-[0.4em] font-bold text-[#241F1A]">
             <span className="relative z-10">View All Products</span>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#241F1A] origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {PRODUCTS.map((product, idx) => {
            const isEven = idx % 2 === 0;
            const gridSpan = product.size === 'large' ? 'lg:col-span-7' : 'lg:col-span-5';
            const marginTop = !isEven ? 'lg:mt-48' : 'mt-0';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: product.delay }}
                className={`${gridSpan} ${marginTop} group cursor-pointer relative`}
              >
                <div className="relative overflow-hidden mb-12 shadow-2xl aspect-[4/5] bg-[#EAE0D3]/50">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle editorial overlays */}
                  <div className="absolute inset-x-0 bottom-0 py-8 px-10 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/20 to-transparent">
                    <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pt-2">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif text-[#241F1A] italic group-hover:text-[#8A947D] transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex gap-4">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-[0.3em] text-[#6A625A] font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl font-serif text-[#241F1A] border-l border-[#241F1A]/10 pl-6 ml-6 italic">
                    {product.price}
                  </span>
                </div>

                {/* Vertical Decorative Accent */}
                <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-[#241F1A]/[0.02] hidden lg:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';

const TESTIMONIALS = [
  {
    quote: "The textures feel luxurious without feeling heavy. It's the first time my skin has felt truly balanced after a long winter.",
    author: "Elena R.",
    role: "Visual Artist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
  },
  {
    quote: "Minimalism at its finest. My routine went from ten steps to four, and my skin has never looked better or more hydrated.",
    author: "Marcus K.",
    role: "Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
  },
  {
    quote: "A sensory experience from start to finish. The soft scent of sage and the weight of the glass bottles make it a ritual I crave.",
    author: "Sophia L.",
    role: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2572&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="editorial-spacing px-8 md:px-24 bg-[#ECE3D7] relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ivory/30 -z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
              Community Stories
            </span>
            <span className="h-[1px] w-24 bg-[#8A947D]/20" />
          </div>
          <h2 className="text-[clamp(40px,8vw,90px)] font-serif text-espresso italic leading-none tracking-tight">The Resilient Glow</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24">
           {TESTIMONIALS.map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.2, duration: 1.2 }}
               className={`space-y-10 ${idx === 1 ? 'md:mt-32' : ''} ${idx === 2 ? 'lg:mt-64' : ''}`}
             >
                <div className="text-sage opacity-40">
                  <span className="text-8xl font-serif">“</span>
                </div>
                <blockquote className="text-2xl md:text-3xl font-serif text-espresso leading-[1.4] italic mb-12">
                  {item.quote}
                </blockquote>
                <div className="pt-8 border-t border-espresso/10 flex items-center gap-6">
                   <div className="w-14 h-14 rounded-full overflow-hidden bg-beige ring-1 ring-espresso/5 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.author}
                        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                   </div>
                   <div>
                    <p className="text-espresso font-bold uppercase tracking-[0.2em] text-[10px]">{item.author}</p>
                    <p className="text-warm-gray text-[10px] uppercase tracking-widest mt-1 opacity-70 font-medium">{item.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

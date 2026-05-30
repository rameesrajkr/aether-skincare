import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const luxuryEasing = [0.22, 1, 0.36, 1];

  return (
    <footer className="py-64 pb-32 px-8 md:px-24 bg-[#120D0A] text-[#F3E7DA] relative overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <h2 className="text-[40vw] font-serif uppercase text-[#A87952]/5 tracking-wider leading-none whitespace-nowrap translate-y-20">
          Æther
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-32 mb-64">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: luxuryEasing }}
            className="flex-1"
          >
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#7C866F] font-bold mb-10">THE INNER CIRCLE</p>
            <h2 className="text-[clamp(64px,12vw,180px)] font-serif italic leading-[0.85] tracking-tight text-[#F3E7DA] mix-blend-screen">
              Begin your <br />
              <span className="pl-[0.2em]">ritual.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: luxuryEasing }}
            className="w-full lg:w-[420px]"
          >
            <div className="group relative pt-8">
              <label className="absolute top-0 left-0 text-[9px] uppercase tracking-[0.4em] text-[#A87952] opacity-0 group-focus-within:opacity-100 transition-all duration-500 translate-y-4 group-focus-within:translate-y-0">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent border-b border-[#F3E7DA]/10 py-6 text-[11px] uppercase tracking-[0.4em] focus:outline-none focus:border-[#A87952] transition-all duration-700 placeholder:text-[#F3E7DA]/20"
              />
              <button className="absolute right-0 bottom-6 text-[10px] uppercase tracking-[0.4em] font-bold text-[#F3E7DA] hover:text-[#A87952] transition-colors duration-500">
                Subscribe
              </button>
            </div>
            <p className="mt-6 text-[10px] text-[#F3E7DA]/40 tracking-wider">Join for exclusive product previews and sensory explorations.</p>
          </motion.div>
        </div>

        {/* Dynamic & Asymmetrical Navigation */}
        <div className="grid lg:grid-cols-12 gap-24 lg:gap-0 border-t border-[#F3E7DA] border-opacity-5 pt-32">
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#A87952] font-bold mb-10">ÆTHER IDENTITY</p>
            <p className="text-2xl font-serif text-[#F3E7DA] mb-12 italic leading-relaxed max-w-sm">
              Thoughtfully formulated skincare rooted in ritual, sensory design, and modern botanical science.
            </p>
            <div className="flex gap-8 mt-16">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'Youtube' }
              ].map(({ Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  className="text-[#F3E7DA]/50 hover:text-[#A87952] transition-all duration-500 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7C866F] mb-12">Collections</h4>
            <ul className="space-y-6">
              {['All Products', 'The Essentials', 'Ritual Sets', 'Special Editions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-light text-[#F3E7DA]/60 hover:text-[#F3E7DA] transition-colors duration-500 decoration-[#A87952]/40 decoration-1 underline-offset-4 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:ml-auto pt-16 lg:pt-0">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7C866F] mb-12">Exploration</h4>
            <ul className="space-y-6">
              {['Our Journal', 'The Science', 'Environmental', 'Modern Living'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-light text-[#F3E7DA]/60 hover:text-[#F3E7DA] transition-colors duration-500 decoration-[#A87952]/40 decoration-1 underline-offset-4 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:ml-auto pt-16 lg:pt-0">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7C866F] mb-12">Company</h4>
            <ul className="space-y-6">
              {['Shipping', 'Returns', 'Stockists', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-light text-[#F3E7DA]/60 hover:text-[#F3E7DA] transition-colors duration-500 decoration-[#A87952]/40 decoration-1 underline-offset-4 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-48 pt-12 border-t border-[#F3E7DA]/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#F3E7DA]/30">© 2026 ÆTHER STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] text-[#F3E7DA]/30">
            <a href="#" className="hover:text-[#F3E7DA]/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F3E7DA]/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


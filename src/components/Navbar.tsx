import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const MENU_ITEMS = [
  { id: 'shop', label: 'Shop' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'journal', label: 'Journal' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const luxuryEasing = [0.22, 1, 0.36, 1];

  const renderMegaMenu = () => {
    if (!activeMenu) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.6, ease: luxuryEasing }}
        className="absolute top-full left-1/2 -translate-x-1/2 w-[100%] max-w-7xl mt-4 z-40"
      >
        <div className="bg-[rgba(255,250,245,0.85)] backdrop-blur-3xl border border-white/40 rounded-[28px] shadow-[0_30px_80px_rgba(20,15,10,0.12)] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative p-12 lg:p-16 flex flex-col lg:flex-row gap-16">
            {activeMenu === 'shop' && (
              <>
                <div className="lg:w-1/2 relative group overflow-hidden rounded-2xl">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: luxuryEasing }}
                    src="https://drive.google.com/thumbnail?id=1b6MS1G8IrweVIVDOCp_nrWEP_yUxvijA&sz=w1200" 
                    alt="Ritual Collection" 
                    className="w-full h-[400px] object-cover brightness-90 group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-4xl font-serif italic mb-2">The Ritual Collection</h3>
                    <p className="text-xs uppercase tracking-widest opacity-80">Elevated essentials for modern rituals</p>
                  </div>
                </div>
                <div className="lg:w-1/2 flex gap-12">
                  <div className="flex-1">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A947D] mb-10">Categories</h4>
                    <ul className="space-y-6">
                      {['Cleansers', 'Serums', 'Moisturizers', 'Treatments', 'SPF', 'Discovery Sets'].map((cat) => (
                        <li key={cat} className="group flex items-center gap-2">
                          <a href="#" className="text-sm uppercase tracking-[0.2em] text-[#241F1A]/60 hover:text-[#241F1A] transition-all duration-300">
                            {cat}
                          </a>
                          <motion.span initial={{ x: -10, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="text-[#8A947D]">
                            <ArrowRight size={14} />
                          </motion.span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-[#F4EEE4]/40 rounded-2xl p-8 border border-white/20">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A947D] mb-8">Featured</h4>
                    <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-white/50 group">
                      <img 
                        src="https://drive.google.com/thumbnail?id=1yyj6VWLTmu4oQMCmVBcaVGg-2LjsMBHU&sz=w1200" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                        alt="Product"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#241F1A]">The Resilience Serum</p>
                    <p className="text-[10px] text-[#6A625A] mt-2 leading-relaxed tracking-wider">High-performance botanical repair.</p>
                  </div>
                </div>
              </>
            )}

            {activeMenu === 'skincare' && (
              <>
                <div className="lg:w-1/3 space-y-12">
                   <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A947D] mb-8">Skin Concerns</h4>
                    <ul className="space-y-4">
                      {['Anti-Aging', 'Hydration', 'Barrier Repair', 'Brightness', 'Acne & Clarity'].map(item => (
                        <li key={item}><a href="#" className="text-xl font-serif italic text-[#241F1A]/80 hover:text-[#8A947D] transition-colors">{item}</a></li>
                      ))}
                    </ul>
                   </div>
                   <div className="pt-8 border-t border-[#241F1A]/5">
                      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A947D] mb-4">The Routine Guide</p>
                      <a href="#" className="flex items-center justify-between group">
                        <span className="text-sm font-semibold tracking-widest text-[#241F1A]">Build your custom ritual</span>
                        <ArrowRight size={16} className="text-[#8A947D] group-hover:translate-x-1 transition-transform" />
                      </a>
                   </div>
                </div>
                <div className="lg:w-2/3 grid grid-cols-2 gap-12">
                  <div className="relative group overflow-hidden rounded-2xl aspect-[16/10]">
                    <img src="https://drive.google.com/thumbnail?id=1bYK5zCoGm-sI0XNeyNOs6g_HPJm4dkiA&sz=w1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Routine" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-[#241F1A]/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-2xl font-serif italic tracking-wider">Morning Rituals</span>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl aspect-[16/10]">
                    <img src="https://drive.google.com/thumbnail?id=1xrlelRyhjm7SDpaech2XB_08qd9hWR2k&sz=w1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Night Routine" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-[#241F1A]/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-2xl font-serif italic tracking-wider">Night Restoration</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeMenu === 'ingredients' && (
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { name: 'Ceramides', desc: 'Lock in deep moisture.', img: 'https://drive.google.com/thumbnail?id=1nNHCV_RzDeWVnrtNgBuTb-jMKUv05guv&sz=w1200' },
                  { name: 'Niacinamide', desc: 'Refine and balance.', img: 'https://drive.google.com/thumbnail?id=14U3d--JjAK-Wlr1_t9DwZ5SFIuJSKQTz&sz=w1200' },
                  { name: 'Centella', desc: 'Calm sensitive states.', img: 'https://drive.google.com/thumbnail?id=1Z_Nzj5HHRmm1CgftYwtNb_KWPZ_EnIEB&sz=w1200' },
                  { name: 'Peptides', desc: 'Firm and restructure.', img: 'https://drive.google.com/thumbnail?id=1YSLB6CsuPFtt-8WJU1eu7BeFa7T9uaqF&sz=w1200' }
                ].map((ing) => (
                  <div key={ing.name} className="group cursor-pointer">
                    <div className="aspect-[4/5] bg-white rounded-xl mb-6 overflow-hidden relative shadow-sm border border-[#241F1A]/5">
                      <img src={`${ing.img}?q=80&w=2574&auto=format&fit=crop`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={ing.name} referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-2xl font-serif italic text-[#241F1A] mb-2">{ing.name}</h3>
                    <p className="text-[10px] tracking-[0.2em] font-bold text-[#8A947D] uppercase">Scientific Botanical</p>
                    <p className="text-[11px] text-[#6A625A] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">{ing.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeMenu === 'journal' && (
              <div className="w-full flex flex-col lg:flex-row gap-16">
                 <div className="lg:w-[400px] shrink-0">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-8 relative group">
                       <img src="https://drive.google.com/thumbnail?id=1xrlelRyhjm7SDpaech2XB_08qd9hWR2k&sz=w1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Journal" referrerPolicy="no-referrer" />
                       <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <h3 className="text-3xl font-serif italic text-[#241F1A] mb-4 leading-tight">Why minimalist skincare works for modern skin.</h3>
                    <a href="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A947D] border-b border-[#8A947D]/30 pb-1">Read the story</a>
                 </div>
                 <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-16">
                    {[
                      { title: 'The art of facial massage', cap: 'Rituals' },
                      { title: 'Understanding barrier repair', cap: 'Science' },
                      { title: 'Morning vs Night routines', cap: 'Guide' },
                      { title: 'The ethics of sourcing', cap: 'Archive' }
                    ].map(story => (
                      <div key={story.title} className="group">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-[#8A947D] font-bold mb-3">{story.cap}</p>
                        <h4 className="text-xl font-serif italic text-[#241F1A] leading-tight group-hover:translate-x-2 transition-transform duration-500 cursor-pointer">{story.title}</h4>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.nav 
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: luxuryEasing }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl"
    >
      <div className="glass-nav flex items-center justify-between min-h-[64px] relative">
        <div className="flex items-center gap-10">
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={22} className="text-[#241F1A]" />
          </button>
          <div className="hidden lg:flex items-center gap-10">
            {MENU_ITEMS.slice(0, 2).map((item) => (
              <button 
                key={item.id}
                onMouseEnter={() => setActiveMenu(item.id)}
                className={`text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative py-2 ${activeMenu === item.id ? 'text-[#8A947D]' : 'text-[#241F1A]'}`}
              >
                {item.label}
                {activeMenu === item.id && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8A947D]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <a 
          href="/" 
          onMouseEnter={() => setActiveMenu(null)}
          className="font-serif text-3xl tracking-[0.4em] uppercase absolute left-1/2 -translate-x-1/2 text-[#241F1A] select-none"
        >
          Æther
        </a>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-10">
            {MENU_ITEMS.slice(2).map((item) => (
              <button 
                key={item.id}
                onMouseEnter={() => setActiveMenu(item.id)}
                className={`text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative py-2 ${activeMenu === item.id ? 'text-[#8A947D]' : 'text-[#241F1A]'}`}
              >
                {item.label}
                {activeMenu === item.id && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8A947D]" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8 text-[#241F1A]">
            <Search size={18} strokeWidth={1.5} className="cursor-pointer hover:text-[#8A947D] transition-colors" />
            <div className="relative group">
              <ShoppingBag size={18} strokeWidth={1.5} className="cursor-pointer hover:text-[#8A947D] transition-colors" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#8A947D] rounded-full scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {activeMenu && renderMegaMenu()}
        </AnimatePresence>
      </div>

      {/* Global backdrop when menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setActiveMenu(null)}
            className="fixed inset-0 -z-10 bg-black/5 backdrop-blur-[2px] transition-all"
          />
        )}
      </AnimatePresence>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="fixed inset-0 z-[100] bg-[#F4EEE4] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="font-serif text-3xl tracking-[0.4em] uppercase">Æther</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} className="text-[#241F1A]" />
              </button>
            </div>
            
            <div className="flex-1 space-y-12">
              {MENU_ITEMS.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.8, ease: luxuryEasing }}
                >
                  <a href="#" className="text-6xl font-serif italic text-[#241F1A] border-b border-[#241F1A]/10 pb-4 block">
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-12 space-y-6"
              >
                <a href="#" className="block text-[11px] uppercase tracking-[0.4em] font-bold text-[#8A947D]">The Essentials</a>
                <a href="#" className="block text-[11px] uppercase tracking-[0.4em] font-bold text-[#241F1A]/60">Our Story</a>
                <a href="#" className="block text-[11px] uppercase tracking-[0.4em] font-bold text-[#241F1A]/60">Sustainability</a>
              </motion.div>
            </div>

            <div className="mt-auto pt-12 flex justify-between items-center text-[10px] uppercase tracking-[0.4em] text-[#241F1A]/40 font-bold">
              <span>© 2026 Æther</span>
              <div className="flex gap-8">
                <span>Insta</span>
                <span>Pin</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

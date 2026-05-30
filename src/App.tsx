/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductGrid from './components/ProductGrid';
import RitualSection from './components/RitualSection';
import IngredientSection from './components/IngredientSection';
import RoutineSection from './components/RoutineSection';
import Testimonials from './components/Testimonials';
import Journal from './components/Journal';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial asset load for smooth experience
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    
    const cursor = document.getElementById('custom-cursor');
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded ? (
        <motion.div 
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-ivory flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl tracking-[0.3em] uppercase text-espresso">Æther</h1>
            <div className="mt-4 w-12 h-[1px] bg-bronze/30 mx-auto overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="w-full h-full bg-espresso"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full relative"
        >
          {/* Global Grain Texture Overlay */}
          <div className="grain" />
          
          {/* Custom Cursor Circle - Refined Luxury Soft Glow */}
          <div className="hidden lg:block fixed w-96 h-96 pointer-events-none z-[100] translate-x-[-50%] translate-y-[-50%] opacity-20 blur-[100px] bg-bronze/10 rounded-full" id="custom-cursor" />
          
          <Navbar />
          
          <div className="relative">
            <Hero />

            <Philosophy />
            <ProductGrid />
            <IngredientSection />
            <RoutineSection />
            <Testimonials />
            <Journal />
            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

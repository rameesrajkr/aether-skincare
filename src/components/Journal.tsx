import { motion } from 'motion/react';

const POSTS = [
  {
    title: "How to repair your skin barrier",
    category: "Rituals",
    image: "https://drive.google.com/thumbnail?id=11btYuV4v8e2BWkgK8uykNf500NLI8Y7E&sz=w1200"
  },
  {
    title: "Why minimalist skincare works",
    category: "Science",
        image: "https://drive.google.com/thumbnail?id=1YSLB6CsuPFtt-8WJU1eu7BeFa7T9uaqF&sz=w1200"
  },
  {
    title: "Understanding hydration vs moisture",
    category: "Guide",
     image: "https://drive.google.com/thumbnail?id=14U3d--JjAK-Wlr1_t9DwZ5SFIuJSKQTz&sz=w1200"
  }
];

export default function Journal() {
  return (
    <section className="editorial-spacing px-8 md:px-24 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] uppercase tracking-[0.6em] text-[#8A947D] font-bold">
                The Library
              </span>
              <span className="h-[1px] w-24 bg-[#8A947D]/20" />
            </div>
            <h2 className="text-5xl md:text-8xl font-serif text-espresso leading-tight italic tracking-tight">The Journal</h2>
          </div>
          <button className="text-[11px] uppercase tracking-widest font-bold border-b border-sage pb-2 hover:border-espresso transition-colors mb-4">
            Browse All Stories
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden mb-10 relative shadow-sm group-hover:shadow-lg transition-all duration-700">
                 <img 
                   src={post.image} 
                   alt={post.title} 
                   className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold flex items-center gap-4">
                  <span className="w-6 h-[1px] bg-sage" />
                  {post.category}
                </p>
                <h3 className="text-3xl font-serif text-espresso leading-[1.2] group-hover:text-sage transition-colors">{post.title}</h3>
                <p className="text-warm-gray text-xs leading-relaxed max-w-sm font-sans italic">
                  Read time: 4 minutes — Explore the intersection of clinical efficacy and botanical ritual.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

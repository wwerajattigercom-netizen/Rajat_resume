/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { TECH_STACK } from "../data";

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-24 right-10 w-96 h-96 bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
            COGNITIVE RESOURCE MAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
            Unified Technology Ecosystem
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base font-light">
            Structured checklist of tools, APIs, frameworks, and deployment standards Rajat actively leverages in day-to-day work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_STACK.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 bg-slate-900/10 border border-white/5 rounded-xl flex flex-col shadow-sm"
            >
              <h3 className="font-display font-bold text-white text-base border-b border-slate-850 pb-3 mb-4 uppercase tracking-wider text-blue-400">
                {group.category}
              </h3>

              <div className="flex-grow flex flex-col gap-2.5">
                {group.items.map((item, id) => (
                  <div key={id} className="flex justify-between items-center py-1.5 border-b border-slate-950 last:border-0 hover:bg-slate-900/20 px-1 rounded transition-colors">
                    <span className="text-slate-300 font-sans text-xs sm:text-sm font-light">{item.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider font-bold rounded ${
                      item.level === "Expert" 
                        ? "bg-slate-950 text-blue-400 border border-blue-500/10" 
                        : item.level === "Intermediate"
                        ? "bg-slate-950 text-cyan-400 border border-cyan-500/10"
                        : "bg-slate-950 text-slate-400 border border-slate-850"
                    }`}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

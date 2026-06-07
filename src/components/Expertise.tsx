/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { EXPERTISE } from "../data";

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
            TECHNICAL DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
            Key Specializations & Strategic Capabilities
          </h2>
          <p className="text-slate-400 font-sans max-w-xl mx-auto text-sm sm:text-base font-light">
            Detailed breakdown of core enterprise software paradigms and the strategic measurable value they inject into corporate operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE.map((item, idx) => {
            // Safely resolve Lucide Icons dynamically
            const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.FileCode;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative p-6 bg-slate-900/20 border border-white/5 hover:border-blue-500/30 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-300 mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-400 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-white/5 text-xs">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-blue-400 font-bold block mb-0.5">
                      BUSINESS IMPACT
                    </span>
                    <p className="text-slate-300 font-sans italic font-light">
                      {item.businessImpact}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                      TECHNOLOGY FRAMEWORK
                    </span>
                    <p className="text-slate-400 font-mono text-[10px]">
                      {item.techRelevance}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

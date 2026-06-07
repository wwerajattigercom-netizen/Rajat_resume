/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Zap, Activity, Globe, Award } from "lucide-react";
import { IMPACTS } from "../data";

export default function FeaturedImpact() {
  const iconMap = [Activity, Zap, Globe, Award];

  return (
    <section id="impact" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
            BUSINESS INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
            Quantified Engineering Impact
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base font-light">
            These metrics encapsulate Rajat's focus on aligning technical excellence with direct, measurable operational savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACTS.map((item, idx) => {
            const IconComponent = iconMap[idx % iconMap.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative overflow-hidden p-6 bg-slate-900/20 border border-white/5 hover:border-slate-800 rounded-xl flex flex-col justify-between shadow-sm transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white">
                      {item.metric}
                    </span>
                    <div className="w-8 h-8 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-500">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-slate-200 font-display font-bold text-sm sm:text-base mb-2">
                    {item.label}
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider font-bold bg-slate-950 border border-slate-800 text-slate-450 rounded">
                    {item.category}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { METRICS } from "../data";

export default function TrustBar() {
  return (
    <div className="bg-slate-900/30 border-y border-white/5 py-10 px-4 md:px-12 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left p-2 border-r border-slate-800/80 last:border-0 md:border-r"
              style={{ borderRightColor: idx === METRICS.length - 1 ? 'transparent' : undefined }}
            >
              <span className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1.5 font-bold">
                {metric.label}
              </span>
              <span className="text-slate-400 text-[10px] sm:text-xs mt-0.5 font-light leading-relaxed">
                {metric.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

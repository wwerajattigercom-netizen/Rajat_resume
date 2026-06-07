/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Calendar, Clock, SquareArrowUpRight, Share2 } from "lucide-react";
import { INSIGHTS } from "../data";

export default function ThoughtLeadership() {
  return (
    <section id="insights" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
              KNOWLEDGE REPOSITORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
              Thought Leadership & Insights
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base max-w-xl font-light">
              Exploring cutting-edge intersections of enterprise relational databases, advanced LLM protocols, and cloud extensions on SAP BTP.
            </p>
          </div>
          
          <button className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono rounded transition-colors cursor-pointer">
            <Share2 className="w-3.5 h-3.5" />
            <span>Follow on LinkedIn</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between p-6 bg-slate-900/20 border border-white/5 hover:border-slate-800 rounded-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 mb-4 uppercase tracking-wider">
                  <span className="px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-850 rounded">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-base sm:text-lg group-hover:text-blue-400 transition-colors mb-3 leading-snug tracking-tight">
                  {article.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed font-sans font-light mb-6">
                  {article.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono text-slate-550">
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>

                <span className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer">
                  <span>Read Article</span>
                  <SquareArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

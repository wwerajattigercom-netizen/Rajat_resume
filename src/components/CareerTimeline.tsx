/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Briefcase, ChevronRight, CornerDownRight } from "lucide-react";
import { TIMELINE } from "../data";

export default function CareerTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
            CHRONOLOGICAL MILESTONES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
            Interactive Career Timeline
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base font-light">
            Select a timeline node to inspect specialized technical contributions, system innovations, and global team collaboration parameters inside production contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Vertical Interactive Selector Rails */}
          <div className="lg:col-span-4 space-y-3.5 flex flex-col justify-start">
            {TIMELINE.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex items-center gap-4 text-left p-4 rounded-lg border transition-all duration-300 w-full cursor-pointer ${
                  activeIndex === idx
                    ? "bg-slate-900/40 border-blue-500/30 text-white shadow-sm"
                    : "bg-slate-900/10 border-white/5 text-slate-400 hover:bg-slate-900/20 hover:text-slate-200"
                }`}
              >
                {activeIndex === idx && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-[-1px] top-3 bottom-3 w-[3px] bg-blue-500 rounded"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <div className={`w-9 h-9 rounded flex items-center justify-center ${
                  activeIndex === idx ? "bg-slate-950 text-blue-400" : "bg-slate-950 text-slate-650"
                }`}>
                  <Briefcase className="w-4.5 h-4.5" />
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-200">{item.company}</h4>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.period}</p>
                </div>

                <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeIndex === idx ? "rotate-90 text-blue-400" : "text-slate-600"}`} />
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Context Displays */}
          <div className="lg:col-span-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 bg-slate-900/10 border border-white/5 rounded-xl flex flex-col h-full justify-between shadow-sm relative"
              >
                {/* Circuit Grid Details */}
                <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-600 select-none">
                  REF-ID: {TIMELINE[activeIndex].company.replace(" ", "-").toUpperCase()}-W4
                </div>

                <div>
                  {/* Job Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                        {TIMELINE[activeIndex].role}
                      </h3>
                      <p className="text-blue-400 font-mono text-xs sm:text-sm mt-1 font-semibold">
                        @{TIMELINE[activeIndex].company}
                      </p>
                    </div>

                    <div className="space-y-1 text-[11px] font-mono text-slate-500 flex flex-col sm:items-end">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {TIMELINE[activeIndex].period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {TIMELINE[activeIndex].location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Core Specialized Contributions & Achievements
                    </h4>
                    <ul className="space-y-3.5 text-slate-400 text-xs sm:text-sm font-sans font-light">
                      {TIMELINE[activeIndex].achievements.map((bullet, idx) => (
                        <li key={idx} className="flex gap-3 items-start leading-relaxed">
                          <CornerDownRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <h5 className="font-display font-medium text-slate-500 text-xs uppercase tracking-wider mb-3">
                    Project Tech Stack / Methodologies
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {TIMELINE[activeIndex].technologies.map((tech, tid) => (
                      <span
                        key={tid}
                        className="px-2 px-1 text-[10px] font-mono text-blue-400/90 bg-blue-500/5 border border-blue-500/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

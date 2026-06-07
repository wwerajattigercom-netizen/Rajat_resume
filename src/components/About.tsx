/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Terminal, Flame, Anchor } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Creative Brand Pitch */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 rounded-xl bg-slate-900/30 border border-white/10 shadow-xl overflow-hidden"
            >
              {/* Circuit backdrop lines */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-blue-500/10 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-cyan-500/10 rounded-bl-xl" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                  <Terminal className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold">Rajat Pande</h4>
                  <p className="text-slate-500 text-xs font-mono">India • GMT +5:30</p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs text-slate-400">
                <div className="flex gap-2 p-2.5 bg-slate-950/60 rounded border border-white/5">
                  <span className="text-blue-400 font-bold">&gt;_ IDE:</span>
                  <span>VS Code, ADT & Web IDE</span>
                </div>
                <div className="flex gap-2 p-2.5 bg-slate-950/60 rounded border border-white/5">
                  <span className="text-cyan-400 font-bold">&gt;_ SPECIALTY:</span>
                  <span>RAP Models, BTP Custom Extensions</span>
                </div>
                <div className="flex gap-2 p-2.5 bg-slate-950/60 rounded border border-white/5">
                  <span className="text-indigo-400 font-bold">&gt;_ AI RADAR:</span>
                  <span>MCP-based SAP integration agents</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5"><Anchor className="w-3.5 h-3.5 text-slate-555" /> Integrity first</div>
                <div className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-blue-400" /> Continuous learner</div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Narratives */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
                THE NARRATIVE ARCHITECT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                Transitioning ERP Pipelines into Modern Cloud Ecosystems
              </h2>
              
              <div className="text-slate-400 font-sans text-base leading-relaxed space-y-4 font-light">
                <p>
                  I entered the SAP ecosystem over five years ago, diving deep into relational transactional logic, standard modularizations, and core table schemas. I quickly realized that traditional enterprise integrations were heavily bogged down by modifications to the standard and tightly-coupled legacy code pools.
                </p>
                <p>
                  This realization triggered my evolution. I pivoted early to embrace <strong className="text-slate-200 font-medium font-sans">SAP S/4HANA in-memory computing</strong>, leveraging AMDP and virtualized semantic models via <strong>CDS Views</strong>. From there, adopting the <strong>RESTful Application Programming (RAP)</strong> design pattern was a natural shift, enabling rapid end-to-end service deployments.
                </p>
                <p>
                  Today, I stand at the forefront of the most modern paradigm shift: <strong className="text-slate-200 font-medium font-sans">SAP BTP Cloud side-by-side extensions</strong>, enforcing clean-core software delivery guidelines, and pioneering direct AI Orchestrations like <strong>Model Context Protocol (MCP) integrations</strong>. I believe enterprise databases shouldn't be isolated monoliths—they should be active participants in modern developer loops.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                  <h5 className="font-display font-bold text-white text-sm mb-1">Clean Core Mindset</h5>
                  <p className="text-slate-500 text-xs font-light">Keeping standard systems untouched for automatic security upgrades.</p>
                </div>
                <div>
                  <h5 className="font-display font-bold text-white text-sm mb-1">AI-Ready Strategy</h5>
                  <p className="text-slate-500 text-xs font-light">Integrating LLMs with SAP ecosystems safely via secure API proxies.</p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

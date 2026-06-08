/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Network, Database, Cpu, Cloud, Code } from "lucide-react";

export default function Hero({ onViewExperience, onConnect }: { onViewExperience: () => void, onConnect: () => void }) {
  const nodes = [
    { id: "ecc", label: "Classic ERP (ECC)", x: 10, y: 30, icon: Database, color: "from-slate-600 to-slate-400" },
    { id: "s4", label: "SAP S/4HANA", x: 35, y: 30, icon: Cpu, color: "from-blue-600 to-indigo-500" },
    { id: "rap", label: "RAP Model", x: 60, y: 15, icon: Code, color: "from-emerald-500 to-teal-400" },
    { id: "btp", label: "SAP BTP Cloud", x: 60, y: 55, icon: Cloud, color: "from-cyan-500 to-blue-500" },
    { id: "mcp", label: "Model Context (MCP)", x: 88, y: 15, icon: Network, color: "from-pink-600 to-indigo-500" },
    { id: "ai", label: "AI Orchestration", x: 88, y: 55, icon: Sparkles, color: "from-amber-400 to-orange-500" },
  ];

  const connections = [
    { from: "ecc", to: "s4", label: "Data Migration" },
    { from: "s4", to: "rap", label: "Service Implementation" },
    { from: "s4", to: "btp", label: "Side-by-Side Coexistence" },
    { from: "rap", to: "mcp", label: "Context Exchanger" },
    { from: "btp", to: "ai", label: "Cloud Integrator" },
    { from: "mcp", to: "ai", label: "Enterprise Intelligent Loop" },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 px-4 md:px-8 border-b border-white/5 bg-slate-950">
      {/* Subtle Minimalist Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none" />

      {/* Extreme subtle blur to soften the deep center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Headline & Core Pitch */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left h-full">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block self-center lg:self-start px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 rounded"
          >
            Senior SAP ABAP Consultant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6 font-display"
          >
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Future</span> <br className="hidden md:inline" />
            of SAP Development
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mb-8"
          >
            Specializing in SAP S/4HANA, RAP, BTP, and AI-Powered enterprise architecture. Delivering high-performance solutions for the modern cloud era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 flex-wrap"
          >
            <button
              onClick={onViewExperience}
              className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-lg hover:border-slate-700 hover:text-white transition-all duration-200 w-full sm:w-auto cursor-pointer text-sm"
            >
              View Experience
            </button>

            <button
              onClick={onConnect}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-semibold rounded-lg transition-all duration-200 w-full sm:w-auto cursor-pointer text-sm"
            >
              Let's Connect
            </button>
          </motion.div>
        </div>

        {/* Right: SAP Architecture inspired interactive schematic diagram */}
        <div className="lg:col-span-5 w-full flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-lg aspect-square bg-slate-900/30 border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">SYSTEM ARCHITECTURE DIRECTORY</span>
            </div>

            {/* Simulated Live Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                return (
                  <g key={`conn-${idx}`}>
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke="rgba(59, 130, 246, 0.12)"
                      strokeWidth="0.75"
                    />
                    <motion.circle
                      r="1"
                      fill="#3b82f6"
                      initial={{ offset: 0 }}
                      animate={{
                        cx: [`${fromNode.x}%`, `${toNode.x}%`],
                        cy: [`${fromNode.y}%`, `${toNode.y}%`],
                      }}
                      transition={{
                        duration: 4 + idx,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const IconComp = node.icon;
              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 p-1 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
                  >
                    <IconComp className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                  
                  {/* Tooltip text */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-800 text-[9px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    {node.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

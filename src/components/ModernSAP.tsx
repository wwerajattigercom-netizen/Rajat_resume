/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, ShieldCheck, Sparkles, Sliders, Layers, ArrowRight } from "lucide-react";

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  explanation: string;
}

export default function ModernSAP() {
  const [activeNodeId, setActiveNodeId] = useState("core");

  const nodes: ArchNode[] = [
    {
      id: "core",
      title: "Clean Core (HANA DB)",
      subtitle: "Database & Tables",
      icon: Database,
      explanation: "Adhering strictly to Clean Core standards. All database triggers, customized tables, and indexes reside securely inside isolated namespace extensions. Standard SAP database pipelines remain entirely untouched, permitting painless global security patches and version upgrades without regression risks."
    },
    {
      id: "auth",
      title: "ABAP Cloud & RAP",
      subtitle: "Modern Service Exposure",
      icon: ShieldCheck,
      explanation: "Using the ABAP RESTful Application Programming (RAP) design pattern to build enterprise core objects. RAP ensures transactional safety (draft handling, lock parameters, and continuous determination triggers) and exposes OData API endpoints natively without heavy legacy dependencies."
    },
    {
      id: "btp",
      title: "SAP BTP Extension Suite",
      subtitle: "Side-by-Side Platform",
      icon: Layers,
      explanation: "The central integration platform. Standard business event queues flow out of S/4HANA into BTP queues, where custom Node.js, Java, or Cloud-ABAP applications execute heavy analytical workflows, preventing CPU throttling inside standard systems."
    },
    {
      id: "mcp",
      title: "AI Gateway & MCP",
      subtitle: "Dynamic LLM Bridging",
      icon: Sparkles,
      explanation: "Pioneering Model Context Protocol (MCP) bridges. By standardizing communication protocols between artificial intelligence frameworks and relational SAP OData schemas, conversational agents can query transactional metadata safely and reliably within security barriers."
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <section id="modern-sap" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Flow Explanation & Detail Block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
              ENTERPRISE COEXISTENCE MAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-6">
              The Future of <br className="hidden sm:inline" /> SAP Development
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed mb-8 font-light">
              True modernization is about decoupling. Click on any system layer on the right to discover how Clean Core, ABAP Cloud, RAP, SAP BTP, and AI MCP nodes synchronize to deliver self-healing SaaS extensions.
            </p>
 
            {/* Highlighting Active Block Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNodeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-slate-900/10 border border-blue-500/20 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-blue-400">
                    <activeNode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-base tracking-tight">
                      {activeNode.title}
                    </h4>
                    <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider font-bold">
                      {activeNode.subtitle}
                    </p>
                  </div>
                </div>
 
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                  {activeNode.explanation}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Component Block Diagram */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {nodes.map((node, index) => {
              const IconComp = node.icon;
              const isActive = node.id === activeNodeId;
              
              return (
                <div key={node.id} className="relative flex items-center">
                  {index < nodes.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-[-20px] w-[1px] bg-slate-800 z-0" />
                  )}

                  <motion.button
                    onClick={() => setActiveNodeId(node.id)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 rounded-xl border transition-all duration-300 w-full cursor-pointer ${
                      isActive
                        ? "bg-slate-900/30 border-blue-400/30 shadow-sm text-white"
                        : "bg-slate-900/10 border-white/5 text-slate-400 hover:bg-slate-900/20 hover:text-slate-200"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? "bg-slate-950 border border-blue-500/35 text-blue-400" : "bg-slate-950 border border-slate-800 text-slate-500"
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-display font-bold text-sm sm:text-base text-white tracking-tight">{node.title}</span>
                        <span className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-slate-950 border border-white/5 text-slate-500 rounded">
                          0{index + 1} LAYER
                        </span>
                      </div>
                      <p className="text-xs font-sans text-slate-400 leading-relaxed line-clamp-2 font-light">
                        {node.explanation}
                      </p>
                    </div>

                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                  </motion.button>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

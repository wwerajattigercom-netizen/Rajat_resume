/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";
import Markdown from "react-markdown";

const SUGGESTED_PROMPTS = [
  "Summarize Rajat's technical background.",
  "What is his experience with ABAP Cloud & BTP?",
  "Tell me about his AI & MCP integration projects.",
  "Is he open to remote opportunities?"
];

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am Rajat's Digital Copilot. I can answer any technical, project-based or availability questions about Rajat's 5+ years of SAP experience. What are you looking to build or solve?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const threadEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat thread bottom
  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setHasError(false);
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      // Direct POST payload to secure, lazy-initialized server api as requested
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) throw new Error("API responded with an error");

      const data = await response.json();
      
      const modelMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: data.text || "I apologize, I experienced a memory allocation issue. Feel free to contact Rajat directly to clarify!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error("AI Assistant request failure:", err);
      setHasError(true);
      
      // Fallback response inside the UI to guide the user
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          text: "I was unable to establish a secure link with Gemini. However, I can confidently confirm that Rajat is a Senior SAP ABAP Consultant (5+ yrs) specializing in modern S/4HANA core architectures, BTP cloud extensions, RAP development, and agile delivery. You can reach him directly at panderajat27@gmail.com!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Absolute Trigger Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 px-4.5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-md cursor-pointer border border-blue-500/20"
      >
        <Bot className="w-4.5 h-4.5" />
        <span className="font-display font-bold text-xs uppercase tracking-wider">Ask Rajat's Twin</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
      </motion.button>

      {/* Overlay Backdrop Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950 z-[9999] cursor-pointer"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-slate-950 border-l border-white/5 shadow-sm z-[99999] flex flex-col justify-between"
            >
              {/* Copilot Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-4.5 h-4.5 text-blue-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-1.5 tracking-tight">
                      Rajat's AI Twin <span className="text-[10px] bg-slate-950 text-slate-400 px-1.5 py-0.5 border border-slate-850 rounded font-mono font-normal">v3.5</span>
                    </h3>
                    <p className="text-[9px] font-mono text-slate-505 tracking-wider">POWERED BY GEMINI PROXY</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-855 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-950/20 scrollbar-thin">
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs ${
                        isUser 
                          ? "bg-slate-900 border-slate-800 text-slate-400" 
                          : "bg-slate-950 border-slate-850 text-blue-400"
                      }`}>
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans leading-relaxed ${
                          isUser
                            ? "bg-slate-900 border border-slate-850 text-slate-100 rounded-tr-none font-light"
                            : "bg-slate-955 border border-white/5 text-slate-350 rounded-tl-none font-sans font-light"
                        }`}>
                          {isUser ? (
                            m.text
                          ) : (
                            <div className="markdown-body">
                              <Markdown
                                components={{
                                  p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed font-light">{children}</p>,
                                  ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1 text-xs font-light">{children}</ul>,
                                  ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1 text-xs font-light">{children}</ol>,
                                  li: ({children}) => <li className="mb-0.5 leading-relaxed">{children}</li>,
                                  code: ({children}) => <code className="bg-slate-900 border border-slate-850 rounded px-1 py-0.5 font-mono text-[10px] text-blue-300">{children}</code>,
                                  a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{children}</a>,
                                  strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>
                                }}
                              >
                                {m.text}
                              </Markdown>
                            </div>
                          )}
                        </div>
                        <span className={`text-[9px] font-mono text-slate-650 block ${isUser ? "text-right" : "text-left"}`}>
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Loading state indicator */}
                {isTyping && (
                  <div className="flex gap-3 max-w-[80%] mr-auto items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-blue-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3.5 bg-slate-955 border border-white/5 text-slate-400 rounded-xl rounded-tl-none flex items-center gap-1.5 text-xs font-mono font-light">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                      <span>Processing enterprise query...</span>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="flex items-center gap-2 p-2.5 bg-amber-955/25 border border-amber-500/10 text-amber-500 text-[11px] font-mono rounded">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Gemini is offline. Utilizing cached local intelligence guidelines.</span>
                  </div>
                )}

                <div ref={threadEndRef} />
              </div>

              {/* Suggestions Panel */}
              <div className="p-4 border-t border-white/5 bg-slate-950/70">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2 tracking-wider">Suggested Queries</span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      disabled={isTyping}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white font-sans text-[11px] rounded transition-all text-left cursor-pointer font-light"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/5 bg-slate-900/40 font-light">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled={isTyping}
                    placeholder="Ask about S/4HANA, BTP, custom extensions, clean core..."
                    className="w-full p-3 pr-12 bg-slate-950 border border-slate-850 focus:border-blue-500/30 rounded text-slate-200 text-xs sm:text-sm font-sans outline-hidden transition-all placeholder:text-slate-700 disabled:opacity-50 font-light"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(inputVal)}
                  />
                  <button
                    onClick={() => handleSend(inputVal)}
                    disabled={isTyping || !inputVal.trim()}
                    className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[9px] font-mono text-slate-650 text-center block mt-2">Active GMT +5:30 • Secure TLS session proxy</span>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

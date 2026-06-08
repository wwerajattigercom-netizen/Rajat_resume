/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, MapPin, Globe, Github, Send, 
  BadgeCheck, Copy, Check, Clock, ExternalLink, Sparkles, Cpu 
} from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [packagerState, setPackagerState] = useState<"idle" | "packaging" | "ready">("idle");
  const [timeStr, setTimeStr] = useState("");

  // Live Timezone Tracker (India standard time - IST - UTC+5.30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email)
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      })
      .catch((err) => console.error("Could not copy email:", err));
  };

  const getMailText = () => {
    return `Hi Rajat,\n\nNice to connect with you! I was exploring your premium SAP Portfolio Hub and wanted to reach out.\n\n` +
      `Here are my details:\n` +
      `- Name: ${formData.name || "Colleague / Visitor"}\n` +
      `- Email: ${formData.email || "visitor@example.com"}\n` +
      `- Topic of Interest: ${formData.subject || "Collaboration & SAP Discussion"}\n\n` +
      `Message Details:\n` +
      `"${formData.message || "Great connecting with you!"}"\n\n` +
      `Looking forward to having a conversation!`;
  };

  const handleCopyPayload = () => {
    const text = getMailText();
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedPayload(true);
        setTimeout(() => setCopiedPayload(false), 2000);
      })
      .catch((err) => console.error("Could not copy payload:", err));
  };

  const handlePackageMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setPackagerState("packaging");
    setTimeout(() => {
      setPackagerState("ready");
    }, 1200);
  };

  const getMailtoUrl = () => {
    const text = getMailText();
    const mailSubject = formData.subject || `SAP Discussion request from ${formData.name || "Discovery Lead"}`;
    return `mailto:${PORTFOLIO_OWNER.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(text)}`;
  };

  const getGmailUrl = () => {
    const text = getMailText();
    const mailSubject = formData.subject || `SAP Discussion request from ${formData.name || "Discovery Lead"}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_OWNER.email)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(text)}`;
  };

  const getOutlookUrl = () => {
    const text = getMailText();
    const mailSubject = formData.subject || `SAP Discussion request from ${formData.name || "Discovery Lead"}`;
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(PORTFOLIO_OWNER.email)}&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(text)}`;
  };

  const getYahooUrl = () => {
    const text = getMailText();
    const mailSubject = formData.subject || `SAP Discussion request from ${formData.name || "Discovery Lead"}`;
    return `https://compose.mail.yahoo.com/?to=${encodeURIComponent(PORTFOLIO_OWNER.email)}&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: System status & coordinates */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3 font-mono">
                ROUTING GATEWAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-5">
                Establish Direct <br />System Connection
              </h2>
              <p className="text-slate-405 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-sm mb-6">
                To guarantee 100% transmission safety and bypass third-party SMTP server and firewall blocks, you can connect directly with Rajat using client-authorized pathways below.
              </p>

              <div className="space-y-4">
                {/* Email Node Card */}
                <div className="p-4 bg-slate-900/10 border border-white/5 rounded-xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-300">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">DIRECT INBOX</span>
                      <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-colors block">
                        {PORTFOLIO_OWNER.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Location Zone */}
                <div className="p-4 bg-slate-900/10 border border-white/5 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-440">
                    <MapPin className="w-4.5 h-4.5 text-slate-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">GEOGRAPHIC NODE</span>
                    <span className="text-slate-200 font-semibold text-xs sm:text-sm leading-relaxed block">
                      {PORTFOLIO_OWNER.location} (Asia)
                    </span>
                  </div>
                </div>

                {/* Dynamic Clock Timezone Zone */}
                <div className="p-4 bg-slate-900/10 border border-white/5 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">LOCAL NODE TIME (IST)</span>
                    <span className="text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-tight block">
                      {timeStr || "Tracking..."} (UTC +5:30)
                    </span>
                  </div>
                </div>

                {/* Availability status */}
                <div className="p-4 bg-slate-900/10 border border-white/5 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center">
                    <Globe className="w-4.5 h-4.5 text-emerald-405 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">OPPORTUNITY BEACON</span>
                    <span className="text-emerald-450 font-mono text-[10px] sm:text-xs font-bold block flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-505 animate-ping" />
                      Active for Remote Advisory, Contracts & Leads
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Social Nodes */}
            <div className="pt-8 border-t border-white/5">
              <h5 className="font-display font-bold text-[9px] text-slate-500 uppercase tracking-widest mb-3.5 block font-mono">
                EXTERNAL NODE HOPS
              </h5>
              <div className="flex gap-3">
                <a 
                  href="https://github.com" // Placeholder template url
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-750 text-xs font-mono transition-all"
                >
                  <Github className="w-4 h-4 text-slate-355" />
                  <span>Explore GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Client Email Builder */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 bg-slate-900/10 border border-white/5 rounded-2xl">
              
              <AnimatePresence mode="wait">
                {packagerState === "ready" ? (
                  <motion.div
                    key="packaged"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="flex flex-col justify-between py-2 min-h-[350px]"
                  >
                    <div className="text-center max-w-sm mx-auto mb-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/15 flex items-center justify-center mb-4 mx-auto">
                        <BadgeCheck className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-white text-base tracking-tight mb-1.5">
                        Message Packaged Safely
                      </h4>
                      <p className="text-slate-405 font-sans text-xs leading-relaxed font-light">
                        To transmit this request to Rajat, trigger one of the client-authorized direct nodes below.
                      </p>
                    </div>

                    {/* Pre-formatted message code box */}
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2 mb-6">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold leading-none">
                        CLIENT DISPATCH PAYLOAD PREVIEW
                      </span>
                      <div className="max-h-40 overflow-y-auto text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
                        {getMailText()}
                      </div>
                    </div>

                    {/* Action Hub */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={handleCopyPayload}
                          className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                        >
                          {copiedPayload ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedPayload ? "Draft Copied!" : "1. Copy Draft Details"}</span>
                        </button>

                        <a
                          href={getGmailUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-red-600/90 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
                        >
                          <Mail className="w-4 h-4" />
                          <span>2. Open Gmail Webmail</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPackagerState("idle");
                          setFormData({ name: "", email: "", subject: "", message: "" });
                        }}
                        className="w-full text-center text-slate-500 hover:text-slate-350 font-mono text-[10px] uppercase tracking-wider pt-2 transition-colors cursor-pointer block"
                      >
                        ← Edit message / Clear Package
                      </button>
                    </div>
                  </motion.div>
                ) : packagerState === "packaging" ? (
                  <motion.div
                    key="packaging"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 min-h-[350px] text-center space-y-4"
                  >
                    <div className="relative w-12 h-12">
                      <span className="absolute inset-0 rounded-full border-2 border-blue-500/10 border-t-blue-500 animate-spin" />
                      <Cpu className="absolute inset-2.5 w-7 h-7 text-blue-500 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-blue-400 text-xs font-bold uppercase tracking-widest block">
                        COMPILING PREFERRED PAYLOAD...
                      </span>
                      <p className="text-slate-500 text-[10px] font-mono leading-none">
                        Structuring header annotations and body components
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handlePackageMessage} 
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                        03. Quick Connection Package Builder
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-name" className="text-[9px] font-mono text-slate-400 uppercase font-bold">Your Name *</label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          placeholder="E.g. Recruiting Manager / Enterprise Director"
                          className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/20 rounded-lg text-slate-200 text-xs font-sans outline-none transition-all placeholder:text-slate-705 font-light"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-email" className="text-[9px] font-mono text-slate-400 uppercase font-bold">Your Email *</label>
                        <input
                          id="form-email"
                          type="email"
                          required
                          placeholder="E.g. director@organization.com"
                          className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/20 rounded-lg text-slate-200 text-xs font-sans outline-none transition-all placeholder:text-slate-705 font-light"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-subject" className="text-[9px] font-mono text-slate-400 uppercase font-bold">Subject / Topic</label>
                      <input
                        id="form-subject"
                        type="text"
                        placeholder="E.g. Senior SAP ABAP Recruitment / Consulting Inquiry"
                        className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/20 rounded-lg text-slate-200 text-xs font-sans outline-none transition-all placeholder:text-slate-705 font-light"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-message" className="text-[9px] font-mono text-slate-400 uppercase font-bold">Message Details *</label>
                      <textarea
                        id="form-message"
                        rows={4}
                        required
                        placeholder="Detail your requirements, project timelines, or interview schedules..."
                        className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/20 rounded-lg text-slate-200 text-xs font-sans outline-none transition-all placeholder:text-slate-705 resize-none font-light leading-relaxed"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!formData.name || !formData.email || !formData.message}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-650 hover:bg-blue-550 disabled:bg-slate-950 disabled:text-slate-600 border border-blue-500/20 text-white font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider font-mono disabled:cursor-not-allowed"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Prepare connection package</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

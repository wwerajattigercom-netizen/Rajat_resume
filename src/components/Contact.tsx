/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Globe, Linkedin, Send, BadgeCheck, AlertCircle } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitDetails, setSubmitDetails] = useState<{ emailSent: boolean; warning?: string; error?: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("sending");
    setErrorMsg("");
    setSubmitDetails(null);
    setLastSubmittedData({ ...formData });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}`);
      }

      const data = await response.json();
      setSubmitDetails({
        emailSent: data.emailSent,
        warning: data.warning,
        error: data.error,
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Failed to reach backend endpoint.");
      setStatus("error");
    }
  };

  const mailtoUrl = lastSubmittedData 
    ? `mailto:panderajat27@gmail.com?subject=${encodeURIComponent(lastSubmittedData.subject || `Portfolio Message from ${lastSubmittedData.name}`)}&body=${encodeURIComponent(
        `Hi Rajat,\n\nI submitted the following message via your portfolio website:\n\n` +
        `-----------------------------------------\n` +
        `From: ${lastSubmittedData.name} <${lastSubmittedData.email}>\n` +
        `Subject: ${lastSubmittedData.subject || "No Subject"}\n\n` +
        `Message:\n${lastSubmittedData.message}\n` +
        `-----------------------------------------\n\n` +
        `Best regards,\n${lastSubmittedData.name}`
      )}`
    : "#";

  const isGoogleAppPasswordErr = !!(submitDetails?.error && (
    submitDetails.error.toLowerCase().includes("application-specific") ||
    submitDetails.error.includes("534-5.7.9") ||
    submitDetails.error.toLowerCase().includes("app password") ||
    submitDetails.error.toLowerCase().includes("app-specific")
  ));

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-b border-white/5 bg-slate-950 relative">
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Detail list & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">
                INTEGRATION PROTOCOL
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-6">
                Let's Build Better <br />SAP Solutions
              </h2>
              <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed mb-8 font-light">
                Looking to expand your SAP development capacity, adopt clean-core side extensions on BTP, integrate custom AI models, or optimize legacy ABAP performance? Reach out below for immediate availability.
              </p>

              <div className="space-y-6">
                {/* Email Item */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-450">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">DIRECT EMAIL</span>
                    <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="text-slate-300 hover:text-white font-sans text-sm sm:text-base font-semibold">
                      {PORTFOLIO_OWNER.email}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-450">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">LOCATION</span>
                    <span className="text-slate-300 font-sans text-sm sm:text-base font-semibold">
                      {PORTFOLIO_OWNER.location}
                    </span>
                  </div>
                </div>

                {/* Status Item */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-450">
                    <Globe className="w-4.5 h-4.5 animate-pulse text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">AVAILABILITY Status</span>
                    <span className="text-emerald-400 font-mono text-xs font-semibold">
                      ● Active for Remote Advisory & Contracts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-10 mt-10 border-t border-white/5">
              <h5 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest mb-4">DIRECT SYSTEM NODES</h5>
              <div className="flex gap-4">
                <a href={PORTFOLIO_OWNER.linkedin} target="_blank" className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Lead Form with interactive feedback */}
          <div className="lg:col-span-7">
            <div className="relative p-7 sm:p-8 bg-slate-900/10 border border-white/5 rounded-xl">
              
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center min-h-[350px]"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/25 flex items-center justify-center mb-6">
                    <BadgeCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2 tracking-tight">Message Processed</h3>
                  
                  {submitDetails?.emailSent ? (
                    <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-sm mb-6 font-light leading-relaxed">
                      A secure lead email has been dispatched via SMTP server. Rajat will review your query and reply within 12 business hours.
                    </p>
                  ) : isGoogleAppPasswordErr ? (
                    <div className="max-w-md mb-6 p-5 bg-slate-950 border border-amber-500/10 rounded text-left space-y-4">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-500 font-mono text-[11px] uppercase font-bold tracking-wider leading-none">
                            Gmail App Password Required
                          </p>
                          <p className="text-slate-400 font-sans text-[11px] mt-1 font-light leading-relaxed">
                            Google rejected the login. Since 2-Step Verification is active on your Gmail account, standard passwords cannot be used for direct server mailing.
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 space-y-2 text-xs font-sans text-slate-300 font-light">
                        <p className="font-semibold text-white text-[11px]">How to resolve this in Google AI Studio:</p>
                        <ol className="list-decimal pl-4 space-y-1.5 text-slate-400 text-[11px]">
                          <li>Go to <a href="https://myaccount.google.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Google Account Settings</a></li>
                          <li>Search for &quot;<strong>App Passwords</strong>&quot;</li>
                          <li>Generate an app password for &quot;Mail&quot;</li>
                          <li>Update your <strong>SMTP_PASS</strong> environment variable in Settings with the 16-character code</li>
                        </ol>
                      </div>

                      <div className="border-t border-white/5 pt-3.5">
                        <p className="text-slate-400 font-sans text-xs font-light mb-3 leading-relaxed">
                          Click below to transmit this message instantly using your device's default mail client instead:
                        </p>
                        <a
                          href={mailtoUrl}
                          className="inline-flex w-full items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send via Mail Client</span>
                        </a>
                      </div>
                    </div>
                  ) : submitDetails?.warning === "SMTP_ERROR" ? (
                    <div className="max-w-md mb-6 p-4 bg-slate-950 border border-red-500/10 rounded text-left space-y-3">
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-mono text-[11px] uppercase font-bold tracking-wider">SMTP Delivery Failure</span>
                      </div>
                      <p className="text-slate-350 font-sans text-xs font-light leading-relaxed">
                        The mail dispatch failed. Details: <code className="bg-slate-900 border border-slate-800 text-red-400 px-1 py-0.5 rounded text-[10px] break-all font-mono block mt-1">{submitDetails.error || "Unknown credentials error"}</code>
                      </p>
                      <p className="text-slate-400 font-sans text-xs font-light leading-relaxed pt-1.5 border-t border-white/5">
                        Please check your SMTP configuration in settings. You can still transmit this message instantly using your local mail client:
                      </p>
                      <a
                        href={mailtoUrl}
                        className="inline-flex w-full items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Mail Client</span>
                      </a>
                    </div>
                  ) : (
                    <div className="max-w-md mb-6 p-4 bg-slate-950 border border-slate-850 rounded text-left space-y-3">
                      <p className="text-amber-500 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 leading-none">
                        ⚠️ Mail Forwarding Pending
                      </p>
                      <p className="text-slate-300 font-sans text-xs font-light leading-relaxed">
                        Your submission has been captured safely in the temporary server message buffer (you can verify it). However, SMTP keys are not configured in your settings.
                      </p>
                      <p className="text-slate-400 font-sans text-xs font-light leading-relaxed">
                        To receive it directly in your inbox, click below to instantly send it as an email via your mail client or app:
                      </p>
                      
                      <a
                        href={mailtoUrl}
                        className="inline-flex w-full items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Mail Client</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs rounded transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Name *</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        disabled={status === "sending"}
                        placeholder="John Doe"
                        className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/30 rounded text-slate-200 text-sm font-sans outline-hidden transition-all placeholder:text-slate-700 font-light"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-email" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Email Address *</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        disabled={status === "sending"}
                        placeholder="john@organization.com"
                        className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/30 rounded text-slate-200 text-sm font-sans outline-hidden transition-all placeholder:text-slate-700 font-light"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-subject" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Subject / Project Topic</label>
                    <input
                      id="form-subject"
                      type="text"
                      disabled={status === "sending"}
                      placeholder="Consulting proposal / SAP Lead Recruitment"
                      className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/30 rounded text-slate-200 text-sm font-sans outline-hidden transition-all placeholder:text-slate-700 font-light"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Message *</label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      disabled={status === "sending"}
                      placeholder="Detail your requirements, project timelines, or interview schedules..."
                      className="p-3 bg-slate-950/80 border border-slate-850 focus:border-blue-500/30 rounded text-slate-200 text-sm font-sans outline-hidden transition-all placeholder:text-slate-700 resize-none font-light"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-650 hover:bg-blue-550 disabled:bg-slate-950 disabled:text-slate-600 border border-blue-500/20 text-white font-bold rounded shadow-sm transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider font-mono disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Transmitting secure payload...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>

                  {/* Submission Error Info */}
                  {status === "error" && (
                    <div className="p-3 bg-red-950/20 border border-red-500/15 text-red-400 text-xs font-mono rounded flex flex-col gap-1.5 mt-3">
                      <span className="font-bold">❌ Error Transmitting Payload:</span>
                      <span>{errorMsg}</span>
                      <a href={mailtoUrl} className="text-blue-400 hover:underline hover:text-blue-300 font-sans text-[11px] mt-1 flex items-center gap-1">
                        ↳ Click here to send via direct mailto client instead.
                      </a>
                    </div>
                  )}

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Menu, X, Terminal, Cpu, MessageSquare, ArrowUp, Briefcase, Sparkles, Send, Mail, Download } from "lucide-react";
import { PORTFOLIO_OWNER } from "./data";

// Sub-component imports
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Expertise from "./components/Expertise";
import CareerTimeline from "./components/CareerTimeline";
import FeaturedImpact from "./components/FeaturedImpact";
import ModernSAP from "./components/ModernSAP";
import CleanCoreSimulator from "./components/CleanCoreSimulator";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import AICopilot from "./components/AICopilot";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "warm">("dark");

  // Read scroll progress for elegant progress bar indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position to color the sticky navigation header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "expertise", "experience", "impact", "modern-sap", "custom-sandbox", "tech-stack", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { label: "About", id: "about" },
    { label: "Expertise", id: "expertise" },
    { label: "Timeline", id: "experience" },
    { label: "Impact", id: "impact" },
    { label: "Modern SAP", id: "modern-sap" },
    { label: "RAP Sandbox", id: "custom-sandbox" },
    { label: "Core Stack", id: "tech-stack" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <div className={`min-h-screen ${theme === "warm" ? "theme-warm bg-stone-950" : "bg-slate-950"} text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white transition-colors duration-500`}>
      
      {/* 1. Global Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[99999] origin-left"
        style={{ scaleX }}
      />

      {/* 2. Premium Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/80 border-b border-white/5 backdrop-blur-md py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Name Node */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 rounded bg-slate-950 flex items-center justify-center border border-slate-850 group-hover:border-blue-500/20 transition-all duration-300">
              <Cpu className="w-4.5 h-4.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <div>
              <span className="font-display font-bold text-sm sm:text-base text-white tracking-tight block">
                {PORTFOLIO_OWNER.name}
              </span>
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">
                SENIOR SAP ARCHITECT
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 font-sans text-xs font-semibold tracking-wide rounded transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? "text-blue-400 font-bold" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Connect Button CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Vibe Switcher (Warm Mode vs Dark Mode) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "warm" : "dark")}
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-850 font-mono text-xs text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Toggle Cozy Warm Mode / Dark Mode"
            >
              {theme === "dark" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Warm Mode</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">Dark Mode</span>
                </>
              )}
            </button>

            <a
              href="/resume.pdf"
              download="Rajat_Pande_Resume.pdf"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 font-mono text-[11px] text-blue-400 hover:text-white rounded transition-colors cursor-pointer"
              title="Download Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 font-mono text-xs text-blue-400 hover:text-cyan-400 rounded transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Let's Discuss</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* 3. Mobile Links Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[64px] left-0 right-0 bg-slate-950 border-b border-white/5 z-[990] p-6 lg:hidden flex flex-col gap-4 shadow-sm"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-2 font-display text-left font-bold text-sm tracking-wide border-b border-white/5 last:border-0 ${
                  activeSection === item.id ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Mobile Theme Switcher */}
            <button
              onClick={() => setTheme(theme === "dark" ? "warm" : "dark")}
              type="button"
              className="w-full flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 font-mono text-xs text-slate-300 rounded transition-colors cursor-pointer mt-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">Workspace Vibe</span>
              {theme === "dark" ? (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-400 font-bold uppercase text-[9px] tracking-wider">Warm Mode</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-blue-400 font-bold uppercase text-[9px] tracking-wider">Dark Mode</span>
                </div>
              )}
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </button>

            <a
              href="/resume.pdf"
              download="Rajat_Pande_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-blue-400 text-xs font-semibold rounded cursor-pointer animate-pulse"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Core Page Sections */}
      <main className="flex-grow">
        <Hero 
          onViewExperience={() => scrollToSection("experience")} 
          onConnect={() => scrollToSection("contact")} 
        />
        <TrustBar />
        <About />
        <Expertise />
        <CareerTimeline />
        <FeaturedImpact />
        <ModernSAP />
        <CleanCoreSimulator />
        <TechStack />
        <Contact />
      </main>

      {/* 5. Custom Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 px-4 md:px-8 relative overflow-hidden text-center">
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Copyright Branding Bar */}
          <div className="mb-6 flex items-center gap-2 justify-center">
            <Cpu className="w-5 h-5 text-blue-500" />
            <span className="font-display font-medium text-white tracking-widest text-sm sm:text-base">RAJAT PANDE PORTFOLIO</span>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm font-sans max-w-md leading-relaxed mb-8 font-light">
            Adhering strictly to standard enterprise Clean Core extension strategies, side-by-side modular BTP applications, and safe Model Context Protocol integrations.
          </p>

          <div className="flex flex-col sm:flex-row p-4 items-center justify-between w-full border-t border-white/5 text-slate-600 text-[11px] sm:text-xs font-mono gap-4">
            <div>
              © {new Date().getFullYear()} Rajat Pande • Senior SAP Consultant Portfolio.
            </div>
            <div className="flex gap-4">
              <span>Secure Server Proxies Only</span>
              <span>•</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                <span>Top of Core</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. Instant Server-Side Recruiter Copilot Trigger */}
      <AICopilot />

    </div>
  );
}

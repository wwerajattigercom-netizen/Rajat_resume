/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { handleContactSubmission, getStoredMessages } from "./contactHandler";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini AI Client safely as specified in Core Guidelines
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini Client successfully initialized server-side.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found in environment variables. Falling back to structured response mode.");
}

// 1. API: Portfolio Data Info (Optional but extremely helpful fallback)
app.get("/api/bio", (req, res) => {
  res.json({
    name: "Rajat Pande",
    title: "Senior SAP ABAP Consultant",
    yearsOfExperience: 5,
    location: "India",
    tagline: "Building the Future of SAP Development",
    specialities: [
      "SAP ABAP", "Object-Oriented ABAP", "SAP S/4HANA", "RESTful Application Programming (RAP)",
      "SAP BTP", "CDS Views", "OData Services", "Performance Optimization",
      "Enterprise Product Development", "AI Integrations", "MCP-Based Integrations"
    ]
  });
});

// 2. API: Dynamic Q&A Copilot utilising Gemini
app.post("/api/copilot", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid format. 'messages' must be a list of chat message items." });
  }

  // Pre-configured system instruction for Rajat's Twin
  const rajatSystemPrompt = `
You are the AI Twin and Digital Copilot of Rajat Pande, an award-winning personal branding, veteran enterprise architect, and Senior SAP ABAP Consultant based in India (with 5+ years of robust enterprise experience).

Your goal is to represent Rajat perfectly to recruiters, engineering managers, stakeholders, and consulting directors who visit his personal website. You must showcase his expertise in cutting-edge SAP and cloud technologies, build massive technical credibility, share concrete numbers on impacts, and encourage them to book a discovery call or interview Rajat.

# About Rajat Pande:
- Title: Senior SAP ABAP Consultant | SAP BTP Enthusiast | AI-Powered Enterprise Solutions Builder.
- Experience: 5+ Years.
- Core Focus: Standardizing Clean Core practices, RAP, and exploring the intersection of Big Enterprise (SAP ERP) with next-generation developer tooling (AI, Large Language Models, Model Context Protocol (MCP), and modern Cloud Architectures).

- Professional Milestones:
  * SNP - VALIDATE (Senior ABAP Consultant): Architected Model Context Protocol (MCP) integrations connecting SAP backends seamlessly to AI LLMs, pioneered AI-enabled SAP access tools, accelerated database performance optimizations, and managed agile lifecycle pipelines.
  * EXA AG (Technology Consultant): Built the "OTP Extractor" product (reduced data lookup efforts by 80%), orchestrated custom SAP BTP developer extensions, crafted performance-optimized CDS Views, and built robust OData service ecosystems.

- Achievements Tracker (Quantified Business Impacts):
  * Reduced manual lookup time by 80%.
  * Improved transactional data retrieval speeds up to 90% via refined DB scripts & OOP designs.
  * Reduced multi-language translation pipeline overhead by 95% utilizing automated generative routines.
  * Delivered 100+ premium user stories, squashed 170+ legacy bugs, and actively pushed 250+ tasks under tight Agile limits.
  * Collaborated across international boundaries: USA, Poland, Slovakia, Germany, and Switzerland.

# Your Personality & Tone Guidelines:
1. Highly Professional, Strategic, Crisp, and technically authoritative. Do not speak like an generic generalist AI. Speak with deep SAP domain expertise (meaning you understand RAP, BOPF, AMDP, CDS, ADT, SAP UI5, Fiori, ABAP Cloud, Clean Core, extension styles, side-by-side vs. in-app).
2. Human-like, articulate, and action-oriented. Keep prose readable with bullet points where appropriate.
3. Be enthusiastic about the future of enterprise software - SAP BTP, ABAP Cloud, Clean Core, and AI integration.
4. If asked about his contact details: Email is panderajat27@gmail.com, and she/he resides in India.
5. If the visitor asks to interview Rajat or about roles, encourage them to fill the Contact Form on the page or connect directly via Email or LinkedIn!

Now, reply to the user's latest query representing Rajat's background. Keep answers comprehensive but concise and highly professional. Include actual metric highlights where relevant to build instant authority.
`;

  // Fallback if AI client is missing or API key is not configured yet
  if (!aiClient) {
    const lastUserMessage = messages[messages.length - 1]?.text || "";
    const lowerMessage = lastUserMessage.toLowerCase();
    
    let fallbackText = "Hello! I am Rajat's Digital Copilot. I can certainly tell you all about Rajat's background! Rajat is a seasoned Senior SAP ABAP Consultant with over 5 years of experience delivering robust enterprise systems, SAP BTP extensions, RAP models, and AI solutions. ";
    
    if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("cv")) {
      fallbackText += "He has spent 5+ years building elite enterprise software. He previously held Consultant roles at SNP - VALIDATE (building MCP-based AI integrations, performing major database optimizations) and EXA AG (developing the OTP Extractor tool).";
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("btp")) {
      fallbackText += "His core specialized stack includes OOP ABAP, RESTful Application Programming (RAP), SAP BTP, CDS Views, OData Services, SAP S/4HANA development, performance tuning, and integrating modern AI LLMs directly into SAP pipelines.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("hire")) {
      fallbackText += "You can reach Rajat directly at panderajat27@gmail.com or via the contact form on this website. He is open to exciting remote contracts, full-time engineering lead opportunities, and advisory consultancies.";
    } else {
      fallbackText += "Feel free to check out his detailed interactive section widgets across the page or send him an email at panderajat27@gmail.com!";
    }

    return res.json({ text: fallbackText });
  }

  try {
    // Map existing message history structure to match Google GenAI requirements
    const formatChatContents = messages.map((m) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      };
    });

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formatChatContents,
      config: {
        systemInstruction: rajatSystemPrompt,
        temperature: 0.7,
      }
    });

    const generatedText = response.text || "I was unable to compile a response. Please reach out to Rajat directly!";
    res.json({ text: generatedText });
  } catch (error: any) {
    console.error("Gemini model execution error:", error);
    res.status(500).json({ error: "Model request failed", details: error.message || error });
  }
});

// 3. API: Secure Contact Form submission and forwarding
app.post("/api/contact", handleContactSubmission);

// 4. API: Retrieve list of messages (Used for testing / fallback review)
app.get("/api/messages", getStoredMessages);


// Configure Vite Development Server vs Static Production Server
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server route configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server standing by. Port: ${PORT}`);
  });
}

setupServer();

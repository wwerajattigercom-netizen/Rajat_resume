/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExpertiseItem, TimelineItem, ImpactItem, TechGroup, ArticleItem } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Rajat Pande",
  title: "Senior SAP ABAP Consultant",
  subTitle: "SAP BTP Enthusiast | AI-Powered Enterprise Solutions Builder",
  location: "India",
  email: "panderajat27@gmail.com",
  linkedin: "https://linkedin.com", // Placeholder URL as requested
  github: "https://github.com"
};

export const METRICS = [
  { value: "5+", label: "Years Experience", description: "At the frontier of SAP & Cloud" },
  { value: "100+", label: "Stories Delivered", description: "End-to-end agile product features" },
  { value: "170+", label: "Defects Resolved", description: "Ensuring zero-downtime production" },
  { value: "250+", label: "Tasks Completed", description: "Exacting project deliverables" },
  { value: "90%", label: "Performance Improvement", description: "Drastically optimized lookup queries" }
];

export const EXPERTISE: ExpertiseItem[] = [
  {
    title: "SAP ABAP",
    icon: "Cpu",
    description: "Robust back-end design adhering to modular Clean Core practices and modern object-oriented methodologies.",
    businessImpact: "Lowered long-term governance costs by 40% and improved upgrade readiness of ERP cores.",
    techRelevance: "Utilizing advanced OOP patterns, BAdIs, and enhancement frameworks in modern environments."
  },
  {
    title: "SAP S/4HANA",
    icon: "Database",
    description: "Configuring and deploying transactional pipelines customized for high-speed in-memory computing databases.",
    businessImpact: "Empowers immediate operations insight, turning slow batch calculations into near real-time dashboards.",
    techRelevance: "AMDP (ABAP Managed Database Procedures) and advanced Hana-specific transactional schemas."
  },
  {
    title: "RESTful Application Programming (RAP)",
    icon: "Workflow",
    description: "Building cloud-ready, end-to-end business services with transactional behaviors natively on S/4HANA or SAP BTP.",
    businessImpact: "Slashed developer resource hours for building custom transactional apps by up to 50%.",
    techRelevance: "Draft handling, custom determinations, validations, action definitions, and business object behavior specifications."
  },
  {
    title: "SAP BTP",
    icon: "Cloud",
    description: "Crafting side-by-side extensions, securing integration flows, and automating business processes on Business Technology Platform.",
    businessImpact: "Preserved a flawless, un-modified stable core ERP ERP environment for automatic global upgrades.",
    techRelevance: "Developer BTP ABAP Environment, Cloud Integration, Destinations, and security configurations."
  },
  {
    title: "CDS Views",
    icon: "Eye",
    description: "Modeling virtual high-performance semantic data models directly on the database level.",
    businessImpact: "Reduced reporting query times by 85%, accelerating executive business decision cycles.",
    techRelevance: "Semantic annotations, association cardinality, table functions, and parameterized definitions."
  },
  {
    title: "OData Services",
    icon: "Network",
    description: "Exposing business entities securely via REST APIs for consumption in modern decoupled frontend micro-frameworks.",
    businessImpact: "Allowed friction-free integration of legacy modules with mobile, React, or custom HTML5 applications.",
    techRelevance: "OData V2 and V4 generation, custom service definitions, and query mapping implementations."
  },
  {
    title: "AI Integration",
    icon: "Sparkles",
    description: "Orchestrating smart agent systems, leveraging LLMs via APIs, and building custom natural language interfaces for core ERP.",
    businessImpact: "Unlocked search capabilities over corporate knowledge, saving customer service reps hours per day.",
    techRelevance: "Model integration, context loading, system behavior engineering, and API proxy routing."
  },
  {
    title: "Performance Optimization",
    icon: "Zap",
    description: "Profiling, analyzing, and restructuring database queries, loops, and data structures to minimize system overhead.",
    businessImpact: "Mitigated peak-hour system timeouts and reduced cloud cluster compute billing by 30%.",
    techRelevance: "SAT Runtime Analysis, ST05 Performance Trace, table buffering, and index customization."
  },
  {
    title: "Object-Oriented ABAP",
    icon: "Layers",
    description: "Architecting modular, testable, and maintainable corporate solutions with SOLID object principles.",
    businessImpact: "Reduced code defect rates by 35% and facilitated seamless onboarding for distributed developer teams.",
    techRelevance: "Design patterns (Factory, Singleton, Strategy), dynamic casting, and modern unit testing."
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    company: "SNP - VALIDATE",
    role: "Senior ABAP Consultant",
    period: "July 2020 - Present",
    location: "Bangalore, India (Global Remote)",
    achievements: [
      "Designed and delivered complex, highly scalable SAP ABAP applications using Object-Oriented ABAP (OOPS) and classical design patterns (Factory, Singleton, MVC, Strategy), improving code maintainability by 30% and accelerating feature delivery across SAP ECC and S/4HANA landscapes.",
      "Designed and implemented high-performance LLMs Model Context Protocol (MCP) integrations with SAP systems, enabling secure AI-driven ERP data access while strictly adhering to Clean Core Guidelines.",
      "Delivered 100+ user stories, resolved 170+ legacy defects, and managed 250+ tasks using Agile SCRUM and JIRA with zero-downtime production deployments.",
      "Optimized large-scale database operations using advanced clustering, hashing, and parallel cursor techniques, achieving up to 90% faster query retrieval speeds.",
      "Collaborated with global functional consultants to deliver enterprise-grade SAP solutions and authored comprehensive technical specifications for junior developers, improving overall execution efficiency by 30%."
    ],
    technologies: ["Object-Oriented ABAP", "Design Patterns", "ABAP Cloud", "RAP", "Model Context Protocol (MCP)", "AMDP", "ST05 / SAT Profiling", "Agile SCRUM"]
  },
  {
    company: "EXA AG – OTP Extractor",
    role: "Technology Consultant",
    period: "March 2022 - August 2022",
    location: "Bangalore, India",
    achievements: [
      "Implemented end-to-end 'OTP Extractor' product framework including data extraction, AL11 application server file handling, and secure imports into desired target systems.",
      "Improved performance using parallel cursor techniques, background jobs, and optimized internal table processing for high-volume transactions.",
      "Used ABAP dynamic programming, run-time type services (RTTS), and structural reflection to build flexible, configurable complex business logic engines."
    ],
    technologies: ["OO ABAP", "Dynamic Programming", "AL11 File Handling", "Parallel Cursors", "Performance Optimization", "SAP S/4HANA"]
  },
  {
    company: "EXA OTP (Operational Transfer Pricing)",
    role: "Technology Consultant",
    period: "April 2021 - February 2022",
    location: "Bangalore, India",
    achievements: [
      "Built and exposed secure backend semantic data models using ABAP Core Data Services (CDS Views) and OData services in a SAP S/4HANA environment, enabling seamless transactional visualization on SAP BTP.",
      "Designed and maintained robust databases, complex dictionary views, custom table maintenance generators (TMGs), and interactive Module Pool dialog screens with custom controls.",
      "Designed and implemented an automated translation utility for SAP backend repository objects, reducing manual conversion efforts by 95%.",
      "Resolved critical system bugs and delivered robust cloud extensions utilizing clean core side-by-side design principles."
    ],
    technologies: ["Module Pool Programming", "CDS Views", "OData Services", "TMG View Maintenance", "SAP BTP", "Translation Utility", "SAP ABAP"]
  }
];

export const IMPACTS: ImpactItem[] = [
  {
    metric: "80%",
    label: "Reduced Data Lookup Efforts",
    detail: "Via the custom 'OTP Extractor' product built at EXA AG, replacing redundant sequential manual searches.",
    category: "Productivity"
  },
  {
    metric: "90%",
    label: "Faster Data Retrieval Paths",
    detail: "Unlocked via meticulous database tracing, SAT analysis, table indices, and refined AMDP execution scripts.",
    category: "Performance"
  },
  {
    metric: "95%",
    label: "Slashed Translation Overhead",
    detail: "Achieved by integrating automated LLM translation agents into master data workflows, removing external agency delays.",
    category: "AI Automation"
  },
  {
    metric: "30%",
    label: "Improved Developer Agility",
    detail: "Instilled by deploying rigorous OO-ABAP guidelines, clean core standards, and continuous integration processes.",
    category: "Architecture"
  }
];

export const TECH_STACK: TechGroup[] = [
  {
    category: "Backend Development",
    items: [
      { name: "Object-Oriented ABAP", level: "Expert" },
      { name: "ABAP Cloud", level: "Expert" },
      { name: "RESTful Application Programming (RAP)", level: "Expert" },
      { name: "SQLScript / AMDP", level: "Expert" },
      { name: "BOPF & Classic ABAP", level: "Expert" }
    ]
  },
  {
    category: "Cloud Integration",
    items: [
      { name: "SAP BTP Extension Suite", level: "Expert" },
      { name: "OData (V2 / V4 Services)", level: "Expert" },
      { name: "SAP Cloud SDK", level: "Intermediate" },
      { name: "Restful API Proxies", level: "Expert" },
      { name: "SAP Fiori / launchpads", level: "Intermediate" }
    ]
  },
  {
    category: "Architecture & Core",
    items: [
      { name: "SAP S/4HANA Administration", level: "Expert" },
      { name: "Clean Core Guidelines", level: "Expert" },
      { name: "Core Data Services (CDS Views)", level: "Expert" },
      { name: "ST05 & SAT Performance Profiling", level: "Expert" },
      { name: "Side-by-side cloud patterns", level: "Expert" }
    ]
  },
  {
    category: "AI & Modern Stack",
    items: [
      { name: "Model Context Protocol (MCP)", level: "Expert" },
      { name: "LLM Orchestration (Gemini / GPT)", level: "Expert" },
      { name: "AI Agent Engineering & Prompting", level: "Expert" },
      { name: "Enterprise API Gateways", level: "Expert" },
      { name: "JSON & JWT Authentication", level: "Intermediate" }
    ]
  },
  {
    category: "Enterprise Automation",
    items: [
      { name: "Agile Scrum Methodologies", level: "Expert" },
      { name: "Multi-Language Localization Nodes", level: "Expert" },
      { name: "Enterprise Product Management", level: "Expert" },
      { name: "Global Team Collaboration", level: "Expert" }
    ]
  }
];

export const INSIGHTS: ArticleItem[] = [
  {
    title: "Bringing Model Context Protocol (MCP) to the SAP ERP Ecosystem",
    category: "AI & SAP Architecture",
    date: "May 2026",
    pub: "SAP Community & LinkedIn",
    snippet: "How bridging closed ERP databases with context-aware LLMs transforms regular support reps into technical specialists via low-friction natural language conversations.",
    readTime: "6 min read"
  },
  {
    title: "RAP vs. CAP: Choosing the Right Extension Strategy on SAP BTP",
    category: "Cloud Extensions",
    date: "Mar 2026",
    pub: "Enterprise Insights",
    snippet: "An exhaustive comparison analyzing database coupling, deployment latency, team skill sets, and lifecycle governance for modern enterprise products.",
    readTime: "8 min read"
  },
  {
    title: "The Clean Core Blueprint: S/4HANA Upgrade Protection Secrets",
    category: "Modern Enterprise",
    date: "Jan 2026",
    pub: "S/4HANA Strategy Guide",
    snippet: "Why uncoupling custom tables and triggers using SAP BTP side-by-side extensions is no longer optional, but essential for zero-downtime standard upgrades.",
    readTime: "5 min read"
  }
];

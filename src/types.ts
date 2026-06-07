/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExpertiseItem {
  title: string;
  icon: string;
  description: string;
  businessImpact: string;
  techRelevance: string;
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export interface ImpactItem {
  metric: string;
  label: string;
  detail: string;
  category: string;
}

export interface TechItem {
  name: string;
  level: "Expert" | "Intermediate" | "Enthusiast";
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export interface ArticleItem {
  title: string;
  category: string;
  date: string;
  pub: string;
  snippet: string;
  readTime: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

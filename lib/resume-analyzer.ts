export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  improvedBullets: string[];
  recommendation: string;
}

const JOB_KEYWORDS: Record<string, string[]> = {
  "software engineer": ["javascript", "python", "git", "api", "agile", "testing", "debugging", "algorithms", "database", "cloud"],
  "frontend developer": ["html", "css", "javascript", "react", "responsive", "accessibility", "ui", "ux", "typescript", "performance"],
  "backend developer": ["api", "database", "sql", "node", "python", "microservices", "security", "scalability", "rest", "cloud"],
  "data analyst": ["sql", "excel", "python", "tableau", "visualization", "statistics", "reporting", "dashboards", "analytics", "data"],
  "project manager": ["stakeholders", "timeline", "budget", "agile", "scrum", "risk", "deliverables", "coordination", "planning", "leadership"],
  "operations manager": ["operations", "process", "efficiency", "team", "budget", "logistics", "kpi", "workflow", "compliance", "leadership"],
  "business analyst": ["requirements", "stakeholders", "process", "documentation", "analysis", "sql", "agile", "reporting", "workflow", "data"],
  "customer success": ["onboarding", "retention", "satisfaction", "support", "relationships", "communication", "crm", "upsell", "churn", "feedback"],
  "marketing manager": ["campaigns", "seo", "analytics", "brand", "content", "social media", "roi", "strategy", "audience", "conversion"],
  "product manager": ["roadmap", "stakeholders", "user research", "agile", "prioritization", "metrics", "strategy", "mvp", "launch", "feedback"],
  default: ["leadership", "communication", "problem solving", "teamwork", "collaboration", "organization", "analytical", "initiative", "results", "management"],
};

const ACTION_VERBS = [
  "led", "managed", "developed", "created", "implemented", "improved", "increased",
  "reduced", "achieved", "delivered", "coordinated", "built", "designed", "optimized",
  "streamlined", "launched", "analyzed", "established", "drove", "spearheaded",
];

const WEAK_PHRASES = [
  "responsible for",
  "duties included",
  "helped with",
  "worked on",
  "assisted with",
  "various tasks",
  "etc",
];

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function getKeywordsForJob(jobTitle: string): string[] {
  const normalized = normalizeText(jobTitle);
  for (const [role, keywords] of Object.entries(JOB_KEYWORDS)) {
    if (role !== "default" && normalized.includes(role)) {
      return keywords;
    }
  }

  const words = normalized.split(/\s+/).filter((w) => w.length > 2);
  const matched = new Set<string>();

  for (const [role, keywords] of Object.entries(JOB_KEYWORDS)) {
    if (role === "default") continue;
    const roleWords = role.split(/\s+/);
    if (roleWords.some((rw) => words.includes(rw))) {
      keywords.forEach((k) => matched.add(k));
    }
  }

  if (matched.size > 0) {
    return [...matched];
  }

  return [...JOB_KEYWORDS.default, ...words.filter((w) => w.length > 3)];
}

function extractBulletPoints(resume: string): string[] {
  return resume
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-•*▸]/.test(line) || /^\d+\./.test(line))
    .map((line) => line.replace(/^[-•*▸]\s*/, "").replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 10);
}

function countMetrics(text: string): number {
  const matches = text.match(/\d+[%$kKmM]?|\d+\s*(?:percent|%|users|clients|customers|team members|projects)/gi);
  return matches ? matches.length : 0;
}

function hasActionVerb(text: string): boolean {
  const lower = normalizeText(text);
  return ACTION_VERBS.some((verb) => lower.startsWith(verb) || lower.includes(` ${verb} `));
}

export function getScoreClass(score: number): string {
  if (score >= 80) return "excellent";
  if (score >= 65) return "good";
  if (score >= 45) return "fair";
  return "poor";
}

function getRecommendation(score: number): string {
  if (score >= 80) {
    return "Your resume is well-aligned with this role. Focus on tailoring your summary and top bullet points to mirror the job description language. You're ready to apply — consider adding one more quantified achievement to stand out.";
  }
  if (score >= 65) {
    return "Your resume has a solid foundation for this role. Incorporate the missing keywords naturally into your experience section, strengthen weak bullet points with metrics, and customize your summary for this specific position.";
  }
  if (score >= 45) {
    return "Your resume needs targeted improvements for this role. Prioritize adding relevant keywords, rewriting bullets with strong action verbs and measurable results, and highlighting experience most relevant to the job title.";
  }
  return "Your resume requires significant tailoring for this position. Restructure your experience to emphasize transferable skills, add role-specific keywords, and rewrite bullet points to demonstrate impact with concrete numbers.";
}

function improveBullet(bullet: string, jobTitle: string): string {
  let improved = bullet.trim();
  const lower = normalizeText(improved);

  for (const phrase of WEAK_PHRASES) {
    if (lower.startsWith(phrase)) {
      improved = improved.slice(phrase.length).trim();
      improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    }
  }

  if (!hasActionVerb(improved)) {
    improved = `Spearheaded ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`;
  }

  if (countMetrics(improved) === 0) {
    improved = `${improved}, improving efficiency and delivering measurable results`;
  }

  if (!improved.endsWith(".")) {
    improved += ".";
  }

  const titleWord = jobTitle.split(/\s+/)[0];
  if (titleWord && titleWord.length > 3 && !normalizeText(improved).includes(normalizeText(titleWord))) {
    improved = improved.replace(/\.$/, ` — directly relevant to ${jobTitle} roles.`);
  }

  return improved;
}

export function analyzeResume(resume: string, jobTitle: string): ResumeAnalysis {
  const resumeLower = normalizeText(resume);
  const keywords = getKeywordsForJob(jobTitle);
  const bullets = extractBulletPoints(resume);
  const wordCount = resume.split(/\s+/).filter(Boolean).length;

  const matchedKeywords = keywords.filter((kw) => resumeLower.includes(kw));
  const missingKeywords = keywords.filter((kw) => !resumeLower.includes(kw));

  const keywordScore = Math.round((matchedKeywords.length / keywords.length) * 35);
  const lengthScore = wordCount >= 100 && wordCount <= 800 ? 15 : wordCount >= 50 ? 8 : 3;
  const bulletScore = bullets.length >= 3 ? Math.min(bullets.length * 3, 15) : bullets.length * 4;
  const metricCount = countMetrics(resume);
  const metricScore = Math.min(metricCount * 5, 15);
  const actionVerbBullets = bullets.filter(hasActionVerb).length;
  const actionScore = bullets.length > 0 ? Math.round((actionVerbBullets / bullets.length) * 10) : 0;
  const jobTitleMentioned = resumeLower.includes(normalizeText(jobTitle)) ? 10 : 0;

  const score = Math.min(
    keywordScore + lengthScore + bulletScore + metricScore + actionScore + jobTitleMentioned,
    100
  );

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (matchedKeywords.length >= keywords.length * 0.5) {
    strengths.push(`Strong keyword alignment — ${matchedKeywords.length} of ${keywords.length} role-relevant terms found.`);
  }
  if (bullets.length >= 4) {
    strengths.push(`Well-structured with ${bullets.length} clear bullet points highlighting experience.`);
  }
  if (metricCount >= 2) {
    strengths.push(`Includes ${metricCount} quantified achievements, which strengthens credibility.`);
  }
  if (actionVerbBullets >= bullets.length * 0.6 && bullets.length > 0) {
    strengths.push("Bullet points lead with strong action verbs.");
  }
  if (wordCount >= 150 && wordCount <= 600) {
    strengths.push("Resume length is within an effective range for recruiters.");
  }
  if (resumeLower.includes("skill")) {
    strengths.push("Contains a dedicated skills section or skill references.");
  }

  if (missingKeywords.length > 0) {
    weaknesses.push(`Missing ${missingKeywords.length} important keywords for a ${jobTitle} role.`);
  }
  if (metricCount === 0) {
    weaknesses.push("No quantified results or metrics found — add numbers to demonstrate impact.");
  }
  if (bullets.length < 3) {
    weaknesses.push("Few bullet points detected — expand experience with specific accomplishments.");
  }
  if (actionVerbBullets < bullets.length * 0.5 && bullets.length > 0) {
    weaknesses.push("Several bullets lack strong action verbs at the start.");
  }
  if (!resumeLower.includes(normalizeText(jobTitle))) {
    weaknesses.push(`Resume doesn't reference the target role "${jobTitle}" — consider tailoring your summary.`);
  }
  if (wordCount < 80) {
    weaknesses.push("Resume appears too brief — add more detail about your experience and skills.");
  }

  const weakBullets = bullets.filter((b) => {
    const lower = normalizeText(b);
    return WEAK_PHRASES.some((p) => lower.includes(p)) || !hasActionVerb(b) || countMetrics(b) === 0;
  });

  if (weakBullets.length > 0) {
    weaknesses.push(`${weakBullets.length} bullet point(s) could be strengthened with stronger language and metrics.`);
  }

  if (strengths.length === 0) {
    strengths.push("Resume provides a starting foundation that can be improved with targeted edits.");
  }
  if (weaknesses.length === 0) {
    weaknesses.push("Minor polish recommended — ensure every bullet follows the action + task + result format.");
  }

  const improvedBullets = (bullets.length > 0 ? bullets : [
    `Contributed to team goals in a ${jobTitle}-related capacity`,
    "Collaborated with cross-functional teams on key initiatives",
    "Supported daily operations and client-facing responsibilities",
  ])
    .slice(0, 4)
    .map((b) => improveBullet(b, jobTitle));

  return {
    score,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    missingKeywords: missingKeywords.slice(0, 8),
    improvedBullets,
    recommendation: getRecommendation(score),
  };
}

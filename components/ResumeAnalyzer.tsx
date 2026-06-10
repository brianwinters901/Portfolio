"use client";

import { useState } from "react";
import { analyzeResume, getScoreClass, type ResumeAnalysis } from "@/lib/resume-analyzer";

type ViewState = "placeholder" | "loading" | "results";

function AnalysisResults({ analysis }: { analysis: ResumeAnalysis }) {
  const scoreClass = getScoreClass(analysis.score);

  return (
    <div className="results-animate">
      <div className="score-card">
        <p className="score-label">Resume Score</p>
        <p className={`score-value ${scoreClass}`}>{analysis.score}</p>
        <p className="score-max">out of 100</p>
        <div className="score-bar">
          <div className="score-bar-fill" style={{ width: `${analysis.score}%` }} />
        </div>
      </div>

      <div className="result-section">
        <h3>Strengths <span className="badge badge-strength">Pro</span></h3>
        <ul className="result-list">
          {analysis.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>Weaknesses <span className="badge badge-weakness">Fix</span></h3>
        <ul className="result-list">
          {analysis.weaknesses.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>Missing Keywords <span className="badge badge-keywords">ATS</span></h3>
        {analysis.missingKeywords.length > 0 ? (
          <div className="keyword-tags">
            {analysis.missingKeywords.map((k) => (
              <span key={k} className="keyword-tag">{k}</span>
            ))}
          </div>
        ) : (
          <p className="recommendation-text">
            Great news — all key keywords for this role appear to be present.
          </p>
        )}
      </div>

      <div className="result-section">
        <h3>Improved Bullet Points <span className="badge badge-bullets">Tips</span></h3>
        <ul className="result-list">
          {analysis.improvedBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>Final Recommendation <span className="badge badge-recommendation">Next</span></h3>
        <p className="recommendation-text">{analysis.recommendation}</p>
      </div>
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [viewState, setViewState] = useState<ViewState>("placeholder");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [resumeError, setResumeError] = useState(false);
  const [jobTitleError, setJobTitleError] = useState(false);

  const handleAnalyze = () => {
    const trimmedResume = resume.trim();
    const trimmedJobTitle = jobTitle.trim();

    if (!trimmedResume) {
      setResumeError(true);
      setTimeout(() => setResumeError(false), 2000);
      return;
    }

    if (!trimmedJobTitle) {
      setJobTitleError(true);
      setTimeout(() => setJobTitleError(false), 2000);
      return;
    }

    setViewState("loading");

    setTimeout(() => {
      setAnalysis(analyzeResume(trimmedResume, trimmedJobTitle));
      setViewState("results");
    }, 1200);
  };

  return (
    <main className="container analyzer-layout">
      <div className="form-panel">
        <div className="form-group">
          <label htmlFor="resumeInput">Your Resume</label>
          <span className="hint">Paste your full resume text including experience, skills, and education.</span>
          <textarea
            id="resumeInput"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder={"e.g.\n\nBrian Winters\nOperations Specialist\n\nExperience:\n- Managed daily operational tasks at Renaissance Leasing\n- Built strong client relationships\n\nSkills: Leadership, Customer Service, AI Tools"}
            style={resumeError ? { borderColor: "var(--danger)" } : undefined}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitleInput">Target Job Title</label>
          <span className="hint">The role you&apos;re applying for.</span>
          <input
            type="text"
            id="jobTitleInput"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Operations Manager, Software Engineer, Business Analyst"
            style={jobTitleError ? { borderColor: "var(--danger)" } : undefined}
          />
        </div>

        <button
          className="btn btn-primary analyze-btn"
          onClick={handleAnalyze}
          disabled={viewState === "loading"}
        >
          {viewState === "loading" ? "Analyzing…" : "Analyze Resume"}
        </button>
      </div>

      <div className="results-panel">
        {viewState === "placeholder" && (
          <div className="results-placeholder">
            <span className="icon">📋</span>
            <p>
              Your analysis results will appear here after you click <strong>Analyze Resume</strong>.
            </p>
          </div>
        )}

        {viewState === "loading" && (
          <div className="analyzing">
            <div className="spinner" />
            <p>Analyzing your resume…</p>
          </div>
        )}

        {viewState === "results" && analysis && <AnalysisResults analysis={analysis} />}
      </div>
    </main>
  );
}

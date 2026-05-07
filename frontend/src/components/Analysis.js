import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig";

function getColor(score) {
  if (score >= 75) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function getGrade(score) {
  if (score >= 90) return { grade: "A+", label: "Exceptional" };
  if (score >= 80) return { grade: "A",  label: "Strong" };
  if (score >= 70) return { grade: "B+", label: "Good" };
  if (score >= 60) return { grade: "B",  label: "Average" };
  if (score >= 50) return { grade: "C",  label: "Below Average" };
  return                  { grade: "D",  label: "Needs Work" };
}

function CircleScore({ score }) {
  const r   = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color  = getColor(score);
  const { grade, label } = getGrade(score);

  return (
    <div className="circle-score-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r}
          fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="70" y="60" textAnchor="middle" fontSize="30" fontWeight="900" fill="#fff">{score}</text>
        <text x="70" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{grade}</text>
        <text x="70" y="96" textAnchor="middle" fontSize="10" fill="#94a3b8">{label}</text>
      </svg>
    </div>
  );
}

const CHECKLIST = [
  { label: "Resume is 300+ words",              key: "length" },
  { label: "Uses strong action verbs",           key: "verbs" },
  { label: "Contains measurable achievements",   key: "metrics" },
  { label: "Skills section present",             key: "skills" },
  { label: "Has Experience, Education & Skills", key: "sections" },
];

function Analysis() {
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const analyze = async () => {
    const text = localStorage.getItem("resume");
    if (!text) { setError("No resume found. Upload or build one first."); return; }
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/analyze`, { text });
      setResult(res.data);
    } catch {
      setError("Analysis failed. Is the backend running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  const checks = result ? {
    length:   !result.feedback.includes("Resume is too short"),
    verbs:    !result.feedback.includes("Use strong action verbs"),
    metrics:  !result.feedback.includes("Add measurable achievements"),
    skills:   result.skills_found && result.skills_found.length > 0,
    sections: !result.feedback.some(f => f.startsWith("Missing sections")),
  } : {};

  return (
    <>
      <div className="analyze-btn-wrap">
        <button className="btn btn-primary btn-lg" onClick={analyze} disabled={loading}>
          {loading ? "⏳ Analyzing..." : "🔍 Analyze Resume"}
        </button>
        {!loading && !result && (
          <span className="analyze-hint">Make sure you've uploaded or built a resume first.</span>
        )}
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}

      {result && (
        <>
          {/* Score hero */}
          <div className="analysis-hero">
            <CircleScore score={result.score} />
            <div className="analysis-hero-text">
              <h3>
                {result.score >= 75 ? "Great resume! 🎉" :
                 result.score >= 50 ? "Decent, but improvable 📈" :
                 "Needs significant work 🔧"}
              </h3>
              <p>
                {result.score >= 75
                  ? "Your resume is well-structured and uses strong language. A few tweaks could push it to perfect."
                  : result.score >= 50
                  ? "You have a solid foundation. Address the suggestions below to stand out more."
                  : "Focus on the checklist items below — fixing them will dramatically improve your score."}
              </p>
              <div className="score-bar-wrap">
                <div className="score-bar-track">
                  <div className="score-bar-fill" style={{ width: `${result.score}%`, background: getColor(result.score) }} />
                </div>
                <span className="score-bar-label">{result.score} / 100</span>
              </div>
            </div>
          </div>

          {/* Grid: checklist + suggestions */}
          <div className="analysis-grid">
            <div className="card">
              <div className="section-title">📋 Checklist</div>
              <div className="checklist">
                {CHECKLIST.map((item) => (
                  <div key={item.key} className={`checklist-item ${checks[item.key] ? "pass" : "fail"}`}>
                    <span className="check-icon">{checks[item.key] ? "✅" : "❌"}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-title">⚠️ Suggestions</div>
              {result.feedback.length > 0 ? (
                <ul className="feedback-list">
                  {result.feedback.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              ) : (
                <div className="alert alert-success">✅ No issues found. Your resume looks great!</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {result.skills_found && result.skills_found.length > 0 && (
            <div className="card">
              <div className="section-title">🛠️ Skills Detected</div>
              <div className="skills-list">
                {result.skills_found.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Analysis;

import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "📄", title: "Upload Resume",   desc: "Drop a PDF or DOCX and we extract everything instantly.",        path: "/upload" },
  { icon: "✏️", title: "Edit Resume",     desc: "Review and fine-tune the extracted text before analysis.",       path: "/edit" },
  { icon: "🏗️", title: "Build Resume",   desc: "Start from scratch with a guided, section-by-section form.",     path: "/build" },
  { icon: "🔍", title: "AI Analysis",     desc: "Score out of 100, checklist, skills detection, and suggestions.", path: "/analysis" },
  { icon: "✉️", title: "Cover Letter",   desc: "Paste a job description and get a tailored letter in seconds.",   path: "/cover-letter" },
];

const stats = [
  { value: "100",  label: "Max Score" },
  { value: "5+",   label: "Checks Run" },
  { value: "Free", label: "Always" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-inner">
          <div className="hero-badge">✨ AI-Powered Resume Tool</div>

          <h1 className="hero-title">
            Land Your Dream Job<br />
            with a <span>Stronger Resume</span>
          </h1>

          <p className="hero-subtitle">
            Upload or build your resume, get an instant AI score with actionable
            feedback, and generate a tailored cover letter — all in one place.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/upload")}>
              Upload Resume →
            </button>
            <button className="btn-ghost btn-lg" onClick={() => navigate("/build")}>
              Build from Scratch
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="home-features">
        <div className="section-heading">
          <h2>Everything you need</h2>
          <p>Five tools, one workflow — from raw file to polished application.</p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.path} onClick={() => navigate(f.path)}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-arrow">Open →</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

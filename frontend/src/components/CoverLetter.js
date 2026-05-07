import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig";

function CoverLetter() {
  const [job, setJob]         = useState("");
  const [letter, setLetter]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [copied, setCopied]   = useState(false);

  const generate = async () => {
    const resume = localStorage.getItem("resume");
    if (!resume) { setError("No resume found. Upload or build one first."); return; }
    if (!job.trim()) { setError("Please paste a job description."); return; }
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/cover-letter`, { resume, job });
      setLetter(res.data.cover_letter);
    } catch {
      setError("Generation failed. Is the backend running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cover-layout">
      {/* Left: input */}
      <div>
        <div className="card">
          <div className="card-title">📋 Job Description</div>
          <textarea
            className="cover-textarea"
            style={{ minHeight: 260 }}
            placeholder="Paste the full job description here. The more detail you provide, the better the cover letter will match the role..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <div style={{ marginTop: 4 }}>
            <button
              className="btn btn-secondary"
              onClick={generate}
              disabled={loading || !job.trim()}
              style={{ width: "100%" }}
            >
              {loading ? "⏳ Generating..." : "✉️ Generate Cover Letter"}
            </button>
          </div>
          {error && <div className="alert alert-error" style={{ marginTop: 12 }}>{error}</div>}
        </div>

        <div className="card">
          <div className="card-title">💡 Tips</div>
          <ul style={{ paddingLeft: 18, fontSize: "0.87rem", color: "var(--muted)", lineHeight: 2 }}>
            <li>Include the full job description for best results</li>
            <li>Make sure your resume is uploaded or built first</li>
            <li>Edit the output to personalize it further</li>
            <li>Remove the placeholder name before sending</li>
          </ul>
        </div>
      </div>

      {/* Right: output */}
      <div className="card" style={{ minHeight: 400 }}>
        <div className="cover-output-header">
          <div className="card-title" style={{ marginBottom: 0 }}>✉️ Generated Letter</div>
          {letter && (
            <button className="cover-copy-btn" onClick={handleCopy}>
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          )}
        </div>

        {letter ? (
          <div className="cover-output">{letter}</div>
        ) : (
          <div className="cover-empty">
            <div className="cover-empty-icon">✉️</div>
            <p style={{ fontWeight: 600, color: "var(--text)" }}>Your cover letter will appear here</p>
            <p style={{ fontSize: "0.85rem" }}>Paste a job description and click Generate</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverLetter;

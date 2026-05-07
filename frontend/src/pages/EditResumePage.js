import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditResumePage() {
  const [text, setText]   = useState("");
  const [saved, setSaved] = useState(false);
  const navigate          = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("resume");
    if (stored) setText(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("resume", text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    if (window.confirm("Clear all resume text?")) {
      setText("");
      localStorage.removeItem("resume");
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text ? text.split("\n").length : 0;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Edit Resume</h2>
        <p>Review and refine the extracted text. Changes are saved to your session.</p>
      </div>

      {!text && (
        <div className="alert alert-info" style={{ marginBottom: 20 }}>
          ℹ️ No resume loaded.{" "}
          <span className="link-text" onClick={() => navigate("/upload")}>Upload one →</span>
          {" "}or{" "}
          <span className="link-text" onClick={() => navigate("/build")}>build from scratch →</span>
        </div>
      )}

      <div className="card">
        <div className="editor-toolbar">
          <div className="editor-stats">
            <div className="editor-stat">
              <div className="editor-stat-value">{wordCount}</div>
              <div className="editor-stat-label">Words</div>
            </div>
            <div className="editor-stat">
              <div className="editor-stat-value">{charCount}</div>
              <div className="editor-stat-label">Chars</div>
            </div>
            <div className="editor-stat">
              <div className="editor-stat-value">{lineCount}</div>
              <div className="editor-stat-label">Lines</div>
            </div>
          </div>
          <div className="editor-actions">
            <button className="btn btn-danger btn-sm" onClick={handleClear}>Clear</button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              {saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        <textarea
          className="resume-editor"
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false); }}
          placeholder="Your resume text will appear here after uploading..."
          spellCheck
        />
      </div>

      {wordCount > 0 && wordCount < 300 && (
        <div className="alert alert-info" style={{ marginBottom: 16 }}>
          ⚠️ Your resume has {wordCount} words. Aim for 300+ for a better score.
        </div>
      )}

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleSave} disabled={!text}>
          {saved ? "✅ Saved!" : "Save Changes"}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/analysis")} disabled={!text}>
          Analyze Resume →
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/upload")}>
          Re-upload
        </button>
      </div>
    </div>
  );
}

export default EditResumePage;

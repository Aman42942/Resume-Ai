import React from "react";
import CoverLetter from "../components/CoverLetter";
import { useNavigate } from "react-router-dom";

function CoverLetterPage() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <h2>Cover Letter Generator</h2>
        <p>Paste a job description on the left — get a tailored cover letter on the right.</p>
      </div>

      <CoverLetter />

      <div className="page-actions" style={{ marginTop: 24 }}>
        <button className="btn btn-outline" onClick={() => navigate("/analysis")}>
          ← Back to Analysis
        </button>
      </div>
    </div>
  );
}

export default CoverLetterPage;

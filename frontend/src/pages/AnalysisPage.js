import React from "react";
import Analysis from "../components/Analysis";
import { useNavigate } from "react-router-dom";

function AnalysisPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <h2>Resume Analysis</h2>
        <p>Get an instant AI score, checklist, and actionable suggestions.</p>
      </div>

      <Analysis />

      <div className="page-actions" style={{ marginTop: 28 }}>
        <button className="btn btn-secondary" onClick={() => navigate("/cover-letter")}>
          Generate Cover Letter →
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/edit")}>
          Edit Resume
        </button>
      </div>
    </div>
  );
}

export default AnalysisPage;

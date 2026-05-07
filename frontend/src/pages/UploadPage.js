import React from "react";
import Upload from "../components/Upload";
import { useNavigate } from "react-router-dom";

const tips = [
  { icon: "📝", title: "Use PDF or DOCX",    text: "These formats give the best text extraction results." },
  { icon: "📏", title: "Keep it concise",    text: "1–2 pages is ideal. Longer resumes score lower." },
  { icon: "🔢", title: "Add metrics",        text: "Numbers and percentages boost your score significantly." },
  { icon: "💡", title: "Use action verbs",   text: "Start bullets with words like 'Led', 'Built', 'Increased'." },
];

function UploadPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <h2>Upload Your Resume</h2>
        <p>Drop your file below — we'll extract the text and get it ready for analysis.</p>
      </div>

      <div className="card">
        <Upload onSuccess={() => navigate("/edit")} />
      </div>

      <div className="card">
        <div className="card-title">💡 Tips for a better score</div>
        <div className="upload-tips">
          {tips.map((t) => (
            <div className="upload-tip" key={t.title}>
              <span className="tip-icon">{t.icon}</span>
              <div className="tip-text">
                <h4>{t.title}</h4>
                <p>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-actions">
        <button className="btn btn-outline" onClick={() => navigate("/build")}>
          Build from scratch instead →
        </button>
      </div>
    </div>
  );
}

export default UploadPage;

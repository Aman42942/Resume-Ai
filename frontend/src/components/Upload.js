import React, { useState, useRef } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig";

function Upload({ onSuccess }) {
  const [file, setFile]       = useState(null);
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag]       = useState(false);
  const inputRef              = useRef();

  const pick = (f) => { setFile(f); setStatus(null); };

  const onDragOver  = (e) => { e.preventDefault(); setDrag(true); };
  const onDragLeave = ()  => setDrag(false);
  const onDrop      = (e) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) pick(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true); setStatus(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post(`${API_BASE_URL}/upload`, fd);
      localStorage.setItem("resume", res.data.text);
      setStatus("success");
      if (onSuccess) setTimeout(onSuccess, 900);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Drop zone — div, not label, to avoid layout collapse */}
      <div
        className={`upload-zone ${drag ? "drag-over" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          style={{ display: "none" }}
          onChange={(e) => pick(e.target.files[0])}
        />
        <span className="upload-icon">☁️</span>
        <h3>{drag ? "Drop it here!" : "Drag & drop your resume"}</h3>
        <p>or click to browse files</p>
        <div className="file-types">
          <span className="file-type-badge">PDF</span>
          <span className="file-type-badge">DOCX</span>
        </div>
      </div>

      {file && (
        <div className="upload-selected">
          <span className="upload-selected-name">📎 {file.name}</span>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {loading && (
        <div className="upload-progress">
          <div className="upload-progress-bar" />
        </div>
      )}

      {status === "success" && (
        <div className="alert alert-success" style={{ marginTop: 16 }}>
          ✅ Resume uploaded and parsed successfully!
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-error" style={{ marginTop: 16 }}>
          ❌ Upload failed. Make sure the backend is running on port 8000.
        </div>
      )}
    </>
  );
}

export default Upload;

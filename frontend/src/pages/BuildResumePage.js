import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = ["Personal", "Summary", "Experience", "Education", "Skills", "Preview"];

const EMPTY = {
  name: "", email: "", phone: "", location: "", linkedin: "", website: "",
  summary: "",
  experience: [{ company: "", role: "", duration: "", bullets: "" }],
  education:  [{ school: "", degree: "", year: "", gpa: "" }],
  skills: "", certifications: "", languages: "",
};

function buildText(f) {
  const lines = [];
  if (f.name) lines.push(f.name.toUpperCase());
  const contact = [f.email, f.phone, f.location, f.linkedin, f.website].filter(Boolean).join("  |  ");
  if (contact) lines.push(contact);
  lines.push("");

  if (f.summary) { lines.push("SUMMARY"); lines.push(f.summary); lines.push(""); }

  if (f.experience.some(e => e.company || e.role)) {
    lines.push("EXPERIENCE");
    f.experience.forEach(e => {
      if (e.company || e.role) {
        lines.push(`${e.role}  —  ${e.company}  ${e.duration ? `(${e.duration})` : ""}`);
        if (e.bullets) e.bullets.split("\n").forEach(b => b.trim() && lines.push(`  • ${b.trim()}`));
        lines.push("");
      }
    });
  }

  if (f.education.some(e => e.school || e.degree)) {
    lines.push("EDUCATION");
    f.education.forEach(e => {
      if (e.school || e.degree) {
        lines.push(`${e.degree}  —  ${e.school}${e.year ? `  (${e.year})` : ""}${e.gpa ? `  GPA: ${e.gpa}` : ""}`);
      }
    });
    lines.push("");
  }

  if (f.skills)          { lines.push("SKILLS");          lines.push(f.skills);          lines.push(""); }
  if (f.certifications)  { lines.push("CERTIFICATIONS");  lines.push(f.certifications);  lines.push(""); }
  if (f.languages)       { lines.push("LANGUAGES");       lines.push(f.languages); }

  return lines.join("\n");
}

function BuildResumePage() {
  const [form, setForm]   = useState(EMPTY);
  const [step, setStep]   = useState(0);
  const [saved, setSaved] = useState(false);
  const navigate          = useNavigate();

  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setExp = (i, k, v) => { const a = [...form.experience]; a[i] = { ...a[i], [k]: v }; setForm(f => ({ ...f, experience: a })); };
  const setEdu = (i, k, v) => { const a = [...form.education];  a[i] = { ...a[i], [k]: v }; setForm(f => ({ ...f, education: a })); };
  const addExp = () => setForm(f => ({ ...f, experience: [...f.experience, { company: "", role: "", duration: "", bullets: "" }] }));
  const addEdu = () => setForm(f => ({ ...f, education:  [...f.education,  { school: "", degree: "", year: "", gpa: "" }] }));
  const remExp = (i) => setForm(f => ({ ...f, experience: f.experience.filter((_, x) => x !== i) }));
  const remEdu = (i) => setForm(f => ({ ...f, education:  f.education.filter((_, x) => x !== i) }));

  const handleSave = () => {
    localStorage.setItem("resume", buildText(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAnalyze = () => {
    localStorage.setItem("resume", buildText(form));
    navigate("/analysis");
  };

  const Input = ({ label, field, placeholder, half }) => (
    <div className={`form-group${half ? "" : " form-group-full"}`}>
      <label>{label}</label>
      <input className="form-input" placeholder={placeholder} value={form[field]} onChange={e => set(field, e.target.value)} />
    </div>
  );

  const Textarea = ({ label, field, placeholder, rows = 3 }) => (
    <div className="form-group form-group-full">
      <label>{label}</label>
      <textarea className="cover-textarea" rows={rows} placeholder={placeholder} value={form[field]} onChange={e => set(field, e.target.value)} />
    </div>
  );

  return (
    <div className="page-wide">
      <div className="page-header">
        <h2>Build Resume</h2>
        <p>Fill in each section — we'll format it automatically.</p>
      </div>

      {/* Step tabs */}
      <div className="build-steps">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`build-step ${i === step ? "active" : i < step ? "done" : ""}`}
            onClick={() => setStep(i)}
          >
            <span className="step-num">{i < step ? "✓" : i + 1}</span>
            {s}
          </button>
        ))}
      </div>

      {/* Step 0 — Personal */}
      {step === 0 && (
        <div className="card">
          <div className="card-title">👤 Personal Information</div>
          <div className="form-grid">
            <Input label="Full Name"            field="name"     placeholder="Jane Doe"                half />
            <Input label="Email"                field="email"    placeholder="jane@example.com"         half />
            <Input label="Phone"                field="phone"    placeholder="+1 234 567 8900"          half />
            <Input label="Location"             field="location" placeholder="New York, NY"             half />
            <Input label="LinkedIn URL"         field="linkedin" placeholder="linkedin.com/in/janedoe"  half />
            <Input label="Portfolio / Website"  field="website"  placeholder="janedoe.dev"              half />
          </div>
        </div>
      )}

      {/* Step 1 — Summary */}
      {step === 1 && (
        <div className="card">
          <div className="card-title">📝 Professional Summary</div>
          <div className="form-grid">
            <Textarea
              label="Summary"
              field="summary"
              placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
              rows={5}
            />
          </div>
          <div className="alert alert-info" style={{ marginTop: 16 }}>
            💡 Keep it to 2–4 sentences. Focus on your top skills and career goal.
          </div>
        </div>
      )}

      {/* Step 2 — Experience */}
      {step === 2 && (
        <div className="card">
          <div className="card-title">💼 Work Experience</div>
          {form.experience.map((exp, i) => (
            <div className="repeatable-section" key={i}>
              <div className="repeatable-header">
                <span className="repeatable-label">🏢 Position {i + 1}</span>
                {form.experience.length > 1 && (
                  <button className="btn-remove" onClick={() => remExp(i)}>✕ Remove</button>
                )}
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company</label>
                  <input className="form-input" placeholder="Acme Corp" value={exp.company} onChange={e => setExp(i, "company", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Role / Title</label>
                  <input className="form-input" placeholder="Senior Engineer" value={exp.role} onChange={e => setExp(i, "role", e.target.value)} />
                </div>
                <div className="form-group form-group-full">
                  <label>Duration</label>
                  <input className="form-input" placeholder="Jan 2022 – Present" value={exp.duration} onChange={e => setExp(i, "duration", e.target.value)} />
                </div>
                <div className="form-group form-group-full">
                  <label>Key Achievements (one per line — start with action verbs)</label>
                  <textarea
                    className="cover-textarea" rows={4}
                    placeholder={"Led migration to microservices, reducing latency by 40%\nManaged a team of 6 engineers across 3 time zones\nBuilt CI/CD pipeline that cut deploy time from 45min to 8min"}
                    value={exp.bullets}
                    onChange={e => setExp(i, "bullets", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="btn-add" onClick={addExp}>+ Add Another Position</button>
        </div>
      )}

      {/* Step 3 — Education */}
      {step === 3 && (
        <div className="card">
          <div className="card-title">🎓 Education</div>
          {form.education.map((edu, i) => (
            <div className="repeatable-section" key={i}>
              <div className="repeatable-header">
                <span className="repeatable-label">🏫 Degree {i + 1}</span>
                {form.education.length > 1 && (
                  <button className="btn-remove" onClick={() => remEdu(i)}>✕ Remove</button>
                )}
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>School / University</label>
                  <input className="form-input" placeholder="MIT" value={edu.school} onChange={e => setEdu(i, "school", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input className="form-input" placeholder="B.Sc. Computer Science" value={edu.degree} onChange={e => setEdu(i, "degree", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Graduation Year</label>
                  <input className="form-input" placeholder="2021" value={edu.year} onChange={e => setEdu(i, "year", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>GPA (optional)</label>
                  <input className="form-input" placeholder="3.8 / 4.0" value={edu.gpa} onChange={e => setEdu(i, "gpa", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button className="btn-add" onClick={addEdu}>+ Add Another Degree</button>
        </div>
      )}

      {/* Step 4 — Skills */}
      {step === 4 && (
        <div className="card">
          <div className="card-title">🛠️ Skills & More</div>
          <div className="form-grid">
            <div className="form-group form-group-full">
              <label>Technical Skills</label>
              <textarea className="cover-textarea" rows={2} placeholder="Python, React, Node.js, SQL, AWS, Docker, Kubernetes..." value={form.skills} onChange={e => set("skills", e.target.value)} />
            </div>
            <div className="form-group form-group-full">
              <label>Certifications</label>
              <textarea className="cover-textarea" rows={2} placeholder="AWS Certified Developer (2023), Google Data Analytics Certificate..." value={form.certifications} onChange={e => set("certifications", e.target.value)} />
            </div>
            <div className="form-group form-group-full">
              <label>Languages</label>
              <textarea className="cover-textarea" rows={1} placeholder="English (Native), Spanish (Fluent), French (Basic)..." value={form.languages} onChange={e => set("languages", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Step 5 — Preview */}
      {step === 5 && (
        <div className="card">
          <div className="card-title">👁️ Resume Preview</div>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: 14 }}>
            This is the formatted text that will be saved and analyzed.
          </p>
          <div className="resume-preview">{buildText(form) || "Nothing to preview yet — fill in the previous steps."}</div>
        </div>
      )}

      {/* Navigation */}
      <div className="page-actions" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 && (
            <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
          )}
          {step < STEPS.length - 1 && (
            <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>
          )}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" onClick={handleSave}>
            {saved ? "✅ Saved!" : "Save"}
          </button>
          <button className="btn btn-secondary" onClick={handleAnalyze}>
            Save & Analyze →
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuildResumePage;

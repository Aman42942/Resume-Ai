# AI Resume Analyzer

A full-stack web app to analyze resumes, score them with AI, and generate cover letters.

- **Frontend** → React.js on `http://localhost:3000`
- **Backend** → FastAPI on `http://localhost:8000`
- **API Docs** → `http://localhost:8000/docs`

---

## First-time setup

Install all dependencies before running for the first time:

```bash
# Install frontend dependencies
npm run install:all

# Install backend dependencies
npm run install:backend
```

---

## Run both together (one command)

```bash
npm start
```

This starts the backend and frontend at the same time in one terminal.

---

## Run separately

**Backend only:**
```bash
# Option 1 — double-click the file
start-backend.bat

# Option 2 — terminal
cd backend
uvicorn main:app --reload
```

**Frontend only:**
```bash
# Option 1 — double-click the file
start-frontend.bat

# Option 2 — terminal
cd frontend
npm start
```

---

## Project structure

```
resume_ai/
├── backend/
│   ├── main.py           # FastAPI app + routes
│   ├── parser.py         # PDF / DOCX text extraction
│   ├── analyzer.py       # Resume scoring algorithm
│   ├── cover_letter.py   # Cover letter generator
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, Upload, Edit, Build, Analysis, CoverLetter
│   │   ├── components/   # Navbar, Upload, Analysis, CoverLetter
│   │   ├── App.js
│   │   └── ThemeContext.js
│   └── package.json
├── start-backend.bat     # Run backend only
├── start-frontend.bat    # Run frontend only
└── package.json          # Run both with: npm start
```

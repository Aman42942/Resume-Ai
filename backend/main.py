from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text
from analyzer import analyze_resume
from cover_letter import generate_cover_letter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text(file.filename, content)
    return {"text": text}

@app.post("/analyze")
async def analyze(data: dict):
    result = analyze_resume(data["text"])
    return result

@app.post("/cover-letter")
async def cover_letter(data: dict):
    result = generate_cover_letter(data["resume"], data["job"])
    return {"cover_letter": result}

@app.get("/")
def home():
    return {"message": "API is running"}

@echo off
echo.
echo  ================================
echo   Starting Backend (FastAPI)
echo   http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo  ================================
echo.
cd backend
pip install -r requirements.txt --quiet
uvicorn main:app --reload --host 0.0.0.0 --port 8000

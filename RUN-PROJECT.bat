@echo off
title AI Resume Analyzer - Full Stack
echo.
echo  =========================================
echo    Starting AI Resume Analyzer
echo  =========================================
echo.

:: Start Backend in a new window
echo Starting Backend (FastAPI) on port 8000...
start cmd /k "echo Starting Backend... && cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

:: Start Frontend in a new window
echo Starting Frontend (React) on port 3000...
start cmd /k "echo Starting Frontend... && cd frontend && npm start"

echo.
echo  -----------------------------------------
echo    Both services are launching!
echo    - Frontend: http://localhost:3000
echo    - Backend:  http://localhost:8000
echo  -----------------------------------------
echo.
echo  Press any key to close this window (services will stay running).
pause > nul

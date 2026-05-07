import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import EditResumePage from "./pages/EditResumePage";
import BuildResumePage from "./pages/BuildResumePage";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/edit" element={<EditResumePage />} />
          <Route path="/build" element={<BuildResumePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

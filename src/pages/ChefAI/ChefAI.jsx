import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "animate.css";

const RecipeAI = () => {
  const [query, setQuery] = useState("");
  const [recipeRaw, setRecipeRaw] = useState("");
  const [recipeClean, setRecipeClean] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const recipeRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const cleanText = (text) =>
    text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\(.*?\)/g, "")
      .replace(/ {2,}/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();

  const handleGetRecipe = async () => {
    if (!query.trim()) {
      toast.warning("Please enter a dish name");
      return;
    }

    try {
      setLoading(true);
      // const res = await axios.post("http://localhost:8080/api/ai/recipe", {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/ai/recipe`, {

        name: query,
      });
      const raw = res.data;
      const clean = cleanText(raw);
      setRecipeRaw(raw);
      setRecipeClean(clean);
      scrollToTop();
    } catch (err) {
      toast.error("Failed to fetch recipe from AI");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    if (recipeRef.current) {
      recipeRef.current.scrollTop = 0;
    }
  };

  const handleSpeak = () => {
    if (!recipeClean) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(recipeClean);
    utterance.lang = "en-IN";
    const voice = voices.find((v) => v.lang === "en-IN");
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Recipe: ${query}`, 14, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(recipeClean, 180);
    doc.text(lines, 14, 30);
    doc.save(`${query}-recipe.pdf`);
  };

  return (
    <div className="container py-5" style={{ marginTop: "6rem" }}>
      <h2 className="text-center fw-bold mb-5 display-5 animate__animated animate__fadeInDown">
        👨‍🍳 <span style={{ color: "#ff5a5f" }}>Chef AI</span> – Cook It Yourself
      </h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm rounded-pill px-4"
            placeholder="🔍 Type a dish like 'Paneer Butter Masala'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2 mt-3 mt-md-0">
          <button
            className="btn btn-lg btn-success w-100 rounded-pill shadow"
            onClick={handleGetRecipe}
            disabled={loading}
          >
            {loading ? " Cooking..." : " Get Recipe"}
          </button>
        </div>
      </div>

      {recipeClean && (
        <div
          className="mx-auto shadow-lg p-4 px-md-5 rounded-4"
          style={{
            backgroundColor: "#fff9f2",
            border: "1px solid #ffe5d0",
            maxWidth: "960px",
            maxHeight: "540px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "1.1rem",
            color: "#333",
          }}
          ref={recipeRef}
        >
          <h4 className="fw-bold text-danger mb-3">
            📋 Here's how to make <span className="text-dark">{query}</span>:
          </h4>
          <div style={{ paddingBottom: "20px" }}>{recipeClean}</div>
        </div>
      )}

      {/* 📌 Fixed Buttons: Always Visible */}
      {recipeClean && (
        <div
          className="position-fixed d-flex gap-3 justify-content-end align-items-center p-3 shadow-lg rounded-pill"
          style={{
            bottom: "20px",
            right: "20px",
            background: "#ffffff",
            border: "1px solid #ddd",
            zIndex: 1000,
          }}
        >
          <button className="btn btn-sm btn-outline-primary" onClick={handleSpeak}>
            🔊 Read
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={handleStop}>
            ⛔ Stop
          </button>
          <button className="btn btn-sm btn-outline-success" onClick={handleDownloadPDF}>
            📄Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeAI;

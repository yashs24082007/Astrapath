"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Transition } from "../components/Transition";
import CosmicCanvas from "../components/CosmicCanvas";

interface StudentParams {
  stage: string;
  stream: string;
  score: string;
  targetExam: string;
  budget: string;
  dropTolerance: string;
  family: string;
  stressed: boolean;
}

export default function Home() {
  const [params, setParams] = useState<StudentParams>({
    stage: "Class 12",
    stream: "PCM",
    score: "82",
    targetExam: "JEE",
    budget: "₹12-18L with loan",
    dropTolerance: "Weighing 0 vs 1 drop",
    family: "Middle class family; loan requires collateral",
    stressed: false,
  });

  const [dilemma, setDilemma] = useState(
    "Should I drop 1 full year for JEE Main & Advanced or take admission in a private college (VIT/SRM/Manipal) for CSE with a ₹16L education loan?"
  );

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Quick Preset dilemmas
  const presets = [
    {
      title: "JEE Drop vs Private Tier-2/3 CSE",
      stream: "PCM",
      exam: "JEE",
      budget: "₹15-20L loan",
      text: "Should I drop 1 full year for JEE Main & Advanced or take admission in a private college for CSE with an education loan?",
    },
    {
      title: "PCB: NEET 2nd Drop vs B.Pharm/Biotech",
      stream: "PCB",
      exam: "NEET",
      budget: "₹6-10L",
      text: "Scored 510 in NEET first attempt. Should I take a second drop year or pivot to B.Pharm / Biotech / BSc Nursing?",
    },
    {
      title: "Commerce: CA vs IPMAT (IIM) with Loan",
      stream: "Commerce",
      exam: "IPMAT",
      budget: "₹25L loan",
      text: "Should I pursue IPMAT for 5-year Integrated MBA at IIM with a heavy loan or stick with low-cost CA + B.Com?",
    },
  ];

  const handleAnalyze = async () => {
    if (!dilemma.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params, dilemma }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error && data.error.includes("GEMINI_API_KEY")) {
          throw new Error(
            "GEMINI_API_KEY is not configured yet. Set it in `.env.local` to get live Gemini responses."
          );
        }
        throw new Error(data.error || "Failed to analyze decision.");
      }

      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative bg-[#0b0c16] text-slate-100 overflow-x-hidden pb-20">
      <Transition />
      <CosmicCanvas />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-600/40 border border-purple-500/30 text-purple-300 text-xs font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            AstraPath AI Decision Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-orange-400 to-purple-400 bg-clip-text text-transparent">
            Student Career & Decision Consultant
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Class 11 & 12 Decision Analysis — Objective constraint modeling, drop-year trade-offs, and irreversible consequence mapping.
          </p>
        </header>

        {/* Quick Presets */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Try a common Indian student scenario:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDilemma(preset.text);
                  setParams((prev) => ({
                    ...prev,
                    stream: preset.stream,
                    targetExam: preset.exam,
                    budget: preset.budget,
                  }));
                }}
                className="text-left p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all text-xs"
              >
                <div className="font-semibold text-amber-300 mb-1">{preset.title}</div>
                <div className="text-slate-400 line-clamp-2">{preset.text}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Parameters + Dilemma */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Parameter Profile */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">01.</span> Profile Parameters
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Academic Stage</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Class 11", "Class 12", "Dropper"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setParams({ ...params, stage: st })}
                      className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                        params.stage === st
                          ? "bg-orange-500/20 border-orange-500 text-orange-300"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Stream</label>
                <div className="grid grid-cols-4 gap-2">
                  {["PCM", "PCB", "Commerce", "Arts"].map((str) => (
                    <button
                      key={str}
                      type="button"
                      onClick={() => setParams({ ...params, stream: str })}
                      className={`py-2 px-2 rounded-lg border text-center font-medium transition ${
                        params.stream === str
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {str}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Score Baseline (%)</label>
                  <input
                    type="text"
                    value={params.score}
                    onChange={(e) => setParams({ ...params, score: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="e.g. 82"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Exam</label>
                  <input
                    type="text"
                    value={params.targetExam}
                    onChange={(e) => setParams({ ...params, targetExam: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="e.g. JEE, NEET, CUET"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">4-Year Budget / Loan Limit</label>
                <input
                  type="text"
                  value={params.budget}
                  onChange={(e) => setParams({ ...params, budget: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. ₹12-18L with loan"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Drop-Year Tolerance</label>
                <input
                  type="text"
                  value={params.dropTolerance}
                  onChange={(e) => setParams({ ...params, dropTolerance: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Weighing 0 vs 1 drop"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Family / Social Constraints</label>
                <input
                  type="text"
                  value={params.family}
                  onChange={(e) => setParams({ ...params, family: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Single earner, location limits"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={params.stressed}
                    onChange={(e) => setParams({ ...params, stressed: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 text-orange-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">
                    I am feeling stressed or overwhelmed right now
                  </span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 pl-7">
                  The AI will include a grounding step before analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dilemma Input & Analysis */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-purple-400">02.</span> Your Dilemma or Decision
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Be specific about options, college names, fees, and uncertainties.
              </p>

              <textarea
                rows={4}
                value={dilemma}
                onChange={(e) => setDilemma(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                placeholder="Describe the decision you are weighing..."
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading || !dilemma.trim()}
                  className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Analyzing Constraints...
                    </span>
                  ) : (
                    "Run Decision Analysis"
                  )}
                </button>
                <span className="text-xs text-slate-500">Gemini 2.5 Flash</span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs sm:text-sm">
                <div className="font-semibold mb-1 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
                {error.includes("GEMINI_API_KEY") && (
                  <p className="mt-1 text-slate-400 text-xs">
                    To fix: create a file named <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">.env.local</code> in your project root with <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">GEMINI_API_KEY=your_key</code> and restart the server.
                  </p>
                )}
              </div>
            )}

            {/* Analysis Results Display */}
            {analysis && (
              <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <span>✨</span> Decision Breakdown
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(analysis)}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition"
                  >
                    Copy Analysis
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {analysis}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

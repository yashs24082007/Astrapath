import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = [
  "You are a decision-analysis assistant for Indian students.",
  "",
  "Rules:",
  "- Be neutral and analytical",
  "- Do NOT motivate, reassure, or encourage",
  "- Do NOT give advice or recommendations",
  "- Do NOT assume positive outcomes",
  "- Treat uncertainty explicitly",
  "- Focus on constraints, trade-offs, risks, and irreversible consequences",
  "- Use plain language and short bullet points",
  "",
  "Mandatory structure:",
  "1. Decision being faced",
  "2. Key constraints (academic, financial, time, eligibility, family/social)",
  "3. Outcome paths:",
  "   a. Optimistic but plausible",
  "   b. Most likely",
  "   c. Worst reasonable case",
  "4. For each path: benefits, risks, irreversible consequences",
  "5. Common mistakes Indian students make",
  "6. Neutral summary",
  "",
  "Stress handling:",
  "- Only if user explicitly says they are stressed",
  "- One short grounding step only"
].join("\n");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const profileBlock = body.params
      ? `Student Profile Parameters:\n- Stage: ${body.params.stage}\n- Stream: ${body.params.stream}\n- Score: ${body.params.score}%\n- Target Exam: ${body.params.targetExam}\n- Budget: ${body.params.budget}\n- Drop Tolerance: ${body.params.dropTolerance}\n- Family Constraint: ${body.params.family}\n- Explicitly Stressed: ${body.params.stressed ? "Yes" : "No"}\n\n`
      : "";

    const prompt = `${SYSTEM_PROMPT}\n\n${profileBlock}User decision:\n${body.dilemma}`;
    const result = await model.generateContent(prompt);
    return NextResponse.json({ analysis: result.response.text() });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to generate analysis" }, { status: 500 });
  }
}

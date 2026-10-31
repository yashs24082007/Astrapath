#!/usr/bin/env python3
"""
AstraPath — Parameterized Indian Higher Secondary Decision-Analysis Bot
Uses Gemini 2.5 Flash with the exact 6-section neutral analytical SYSTEM_PROMPT.
"""
import os
import google.generativeai as genai

API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyAd4m8xzzIcGcvDffvLOGO2_B_IcXirDMI")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-2.5-flash")

SYSTEM_PROMPT = (
    "You are a decision-analysis assistant for Indian students.\n\n"
    "Rules:\n"
    "- Be neutral and analytical\n"
    "- Do NOT motivate, reassure, or encourage\n"
    "- Do NOT give advice or recommendations\n"
    "- Do NOT assume positive outcomes\n"
    "- Treat uncertainty explicitly\n"
    "- Focus on constraints, trade-offs, risks, and irreversible consequences\n"
    "- Use plain language and short bullet points\n\n"
    "Mandatory structure:\n"
    "1. Decision being faced\n"
    "2. Key constraints (academic, financial, time, eligibility, family/social)\n"
    "3. Outcome paths:\n"
    "   a. Optimistic but plausible\n"
    "   b. Most likely\n"
    "   c. Worst reasonable case\n"
    "4. For each path: benefits, risks, irreversible consequences\n"
    "5. Common mistakes Indian students make\n"
    "6. Neutral summary\n\n"
    "Stress handling:\n"
    "- Only if user explicitly says they are stressed\n"
    "- One short grounding step only\n"
)

def collect_student_profile():
    print("============================================================")
    print("  AstraPath — Class 11 & 12 Decision Analysis Consultant")
    print("============================================================")
    stream = input("1. Academic Stream (PCM / PCB / Commerce / Arts) [PCM]: ").strip() or "PCM"
    score = input("2. Class 12 / Mock Score % [82%]: ").strip() or "82%"
    exam = input("3. Target Exam (JEE / NEET / CUET / CA / CLAT / IPMAT) [JEE]: ").strip() or "JEE"
    budget = input("4. 4-Year Family Budget / Loan Limit [₹12-18L with loan]: ").strip() or "₹12-18L with loan"
    drop = input("5. Drop-Year Tolerance [Weighing 0 vs 1 drop]: ").strip() or "Weighing 0 vs 1 drop"
    stressed = input("6. Are you feeling stressed right now? (yes/no) [no]: ").strip().lower() or "no"
    return (
        f"Student Profile Parameters:\n"
        f"- Stream: {stream}\n"
        f"- Score Baseline: {score}\n"
        f"- Target Exam: {exam}\n"
        f"- Financial Constraint: {budget}\n"
        f"- Time/Drop Constraint: {drop}\n"
        f"- Explicitly Stressed: {stressed}\n"
    )

def main():
    profile = collect_student_profile()
    print("\nType 'exit' to stop or 'profile' to update your parameters.\n")
    while True:
        user_input = input("You (Decision/Dilemma): ").strip()
        if user_input.lower() == "exit":
            print("Session ended.")
            break
        if user_input.lower() == "profile":
            profile = collect_student_profile()
            continue
        if not user_input:
            continue

        prompt = f"{SYSTEM_PROMPT}\n{profile}\nUser decision:\n{user_input}"
        response = model.generate_content(prompt)
        print("\nAnalysis:\n")
        print(response.text)
        print("\n" + "-" * 60 + "\n")

if __name__ == "__main__":
    main()

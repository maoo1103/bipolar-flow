import { GoogleGenAI } from "@google/genai";
import { MoodLevel } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCompanionInsight = async (
  mood: MoodLevel, 
  context: { 
    triggers: string[], 
    sleepHours: number, 
    medicationTaken: boolean,
    sleepIssues: string[]
  }
): Promise<string> => {
  try {
    if (!process.env.API_KEY) return "Gemini API Key missing.";

    const moodPrompts: Record<MoodLevel, string> = {
      [MoodLevel.ROCKET]: "State: Mania/Impulsive. Risk high.",
      [MoodLevel.FERRIS_WHEEL]: "State: Hypomania/Creative. Energy high.",
      [MoodLevel.STEADY]: "State: Baseline/Euthymia.",
      [MoodLevel.HOLDING_BREATH]: "State: Mild Depression/Masking.",
      [MoodLevel.DEEP_SEA]: "State: Moderate Depression/Slow.",
      [MoodLevel.ABYSS]: "State: Crisis/Darkness.",
    };

    const triggersText = context.triggers.length > 0 ? `Background: ${context.triggers.join(', ')}.` : "No triggers.";
    const sleepText = `Sleep: ${context.sleepHours}h (${context.sleepIssues.join(', ') || 'OK'}).`;
    
    const prompt = `
      Role: Bipolar Companion.
      Status: ${moodPrompts[mood]}
      Data: ${triggersText} ${sleepText}
      Task: One short, warm sentence (max 20 words). Validate their effort.
      No advice, no "hope".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Recorded.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Recorded.";
  }
};

export const generateClinicalReport = async (dataSummary: string): Promise<string> => {
    try {
        if (!process.env.API_KEY) return "API Key missing.";
        
        const prompt = `
            Act as a medical scribe. Summarize the following Bipolar Disorder patient data (7 days):
            ${dataSummary}

            Generate a "Clinical Brief" covering:
            1. **Patterns**: Mention any links between Mood & Menstrual Cycle (Moon Phase) or Weather (if noted).
            2. **Symptoms**: Frequency of 'Depressive' vs 'Manic' specific tags.
            3. **Adherence**: Medication status.
            4. **Sleep**: Avg hours and stability.

            Style: Medical professional, bullet points, objective. Max 130 words.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text?.trim() || "Report generation failed.";
    } catch (e) {
        console.error(e);
        return "Error generating report.";
    }
}
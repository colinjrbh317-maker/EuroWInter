
import { GoogleGenAI, Type } from "@google/genai";
import { DailyInsights } from "../types";

export const getDailyInsights = async (date: string, location: string, activities: string[]): Promise<DailyInsights> => {
  // 1. Check Cache first for maximum speed
  const cacheKey = `trip_cache_${date}_${location}`.replace(/\s+/g, '_');
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error("Cache parse error", e);
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 2. Optimized prompt for minimal latency
  const prompt = `
    Context: Trip on ${date} in ${location}. 
    Activities: ${activities.join(", ")}.
    
    Required JSON (Strict):
    - temp: Fahrenheit only.
    - condition: 1-2 words.
    - headline: 5-10 words. FACTUAL landmarks only. No fluff.
    - distance: MILES.
    - duration: hours/mins.
    - summary: 1 short logistical sentence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            temp: { type: Type.STRING },
            condition: { type: Type.STRING },
            headline: { type: Type.STRING },
            distance: { type: Type.STRING },
            duration: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["temp", "condition", "headline", "distance", "duration", "summary"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const finalResult: DailyInsights = {
      ...data,
      groundingUrls: (grounding as any[]).map(chunk => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || "#"
      })).filter(g => g.uri !== "#")
    };

    // 3. Store in cache for next time
    localStorage.setItem(cacheKey, JSON.stringify(finalResult));
    
    return finalResult;
  } catch (error) {
    console.error("Insights fetch failed:", error);
    return { 
      temp: "34°F", 
      condition: "Clear", 
      headline: "Berlin: Museum Island and the TV Tower.",
      distance: "4.1 miles", 
      duration: "2 hours", 
      summary: "Historical walking tour of central Berlin landmarks.", 
      groundingUrls: [] 
    };
  }
};

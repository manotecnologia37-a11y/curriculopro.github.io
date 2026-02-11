
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function optimizeSummary(currentSummary: string, jobTitle: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Otimize o seguinte resumo profissional para o cargo de ${jobTitle}. Torne-o impactante, profissional e focado em conquistas. Responda apenas com o texto do resumo otimizado em português: "${currentSummary}"`,
    });
    return response.text?.trim() || currentSummary;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentSummary;
  }
}

export async function improveBulletPoints(description: string, position: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Reescreva a seguinte descrição de experiência profissional para o cargo de ${position}. Use verbos de ação e foque em resultados quantificáveis. Responda apenas com o novo texto em português: "${description}"`,
    });
    return response.text?.trim() || description;
  } catch (error) {
    console.error("Gemini Error:", error);
    return description;
  }
}

export async function parseResumeData(rawText: string): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extraia as informações do seguinte texto para preencher um currículo profissional. 
      Se alguma informação não for encontrada, deixe o campo vazio. 
      Mantenha o idioma original do texto (Português).
      
      TEXTO BRUTO:
      "${rawText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personalInfo: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                location: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                jobTitle: { type: Type.STRING }
              }
            },
            summary: { type: Type.STRING },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  position: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            educations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  institution: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  field: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING }
                }
              }
            },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  level: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });

    const jsonText = response.text?.trim();
    if (jsonText) {
      return JSON.parse(jsonText);
    }
    return null;
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    return null;
  }
}

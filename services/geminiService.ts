import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const getAiClient = () => {
    // Ensuring API key availability is handled externally as per instructions
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateProductInsights = async (product: Product, query: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      You are an expert shopping assistant for an e-commerce store called Lumina Commerce.
      
      Product Context:
      Name: ${product.name}
      Price: $${product.price}
      Category: ${product.category}
      Description: ${product.description}
      Features: ${product.features.join(', ')}

      User Question: "${query}"

      Provide a helpful, concise, and sales-oriented answer. 
      If the user asks if it's worth it, analyze the price-to-performance based on the features.
      Keep the tone professional yet friendly. Max 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't generate an insight at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI assistant is currently offline. Please try again later.";
  }
};

export const generateReviewSummary = async (product: Product): Promise<string> => {
    try {
        const ai = getAiClient();
        const prompt = `
          Generate a hypothetical, realistic summary of customer reviews for this product based on its description and features.
          Product: ${product.name} - ${product.description}
          
          Highlight 2 pros and 1 potential con. Format as a short paragraph.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
    
        return response.text || "Summary unavailable.";
      } catch (error) {
        return "Unable to fetch review summary.";
      }
};
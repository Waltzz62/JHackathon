import { Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()

const url: string | undefined = process.env.CHAT_API_URL!

export const getRecipe = async (req: Request, res: Response) => {
  if (!url) {
    console.error("CHATBOT_API_URL environment variable is not set.");
    return res.status(500).json({ message: "Server configuration error: CHATBOT_API_URL is missing." });
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return res.status(response.status).json({ 
            message: `External API failed with status ${response.status}`, 
            details: errorData 
        });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recipe", error: error.message });
  }
};
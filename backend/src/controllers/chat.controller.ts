import { Request, Response } from "express";

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://jedad.app.n8n.cloud/webhook/get-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recipe", error: error.message });
  }
};
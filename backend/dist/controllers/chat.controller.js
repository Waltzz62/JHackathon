"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipe = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.CHAT_API_URL;
const getRecipe = async (req, res) => {
    if (!url) {
        console.error("CHAT_API_URL environment variable is not set.");
        return res.status(500).json({ message: "Server configuration error: CHAT_API_URL is missing." });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch recipe", error: error.message });
    }
};
exports.getRecipe = getRecipe;

import express from "express"
import * as ChatController from "../controllers/chat.controller"

const chatRouter = express.Router()

chatRouter.post("/get-recipe", ChatController.getRecipe)

export default chatRouter
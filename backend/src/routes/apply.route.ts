import express from 'express'
import * as ApplyController from "../controllers/apply.controller"

const applyRouter = express.Router()

applyRouter.get("/applies", ApplyController.getAllApply)
applyRouter.post("/create", ApplyController.createApply)
applyRouter.put("/update/:id", ApplyController.updateApplyStatus)

export default applyRouter
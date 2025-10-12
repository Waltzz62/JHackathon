import express from 'express'
import * as StaffController from "../controllers/staff.controller"

const staffRouter = express.Router()

staffRouter.get("/staffs", StaffController.getAllStaff)
staffRouter.put("/update/:id", StaffController.updateStaff)
staffRouter.delete("/delete/:id", StaffController.deleteStaff)

export default staffRouter
import express from 'express';
import * as ClassController from '../controllers/class.controller'

const classRouter = express.Router()

classRouter.post('/create', ClassController.createClass)
classRouter.get('/classes', ClassController.getAllClass)
// classRouter.get('/class/:id', ClassController.getClassById)
classRouter.put('/update/:class_id', ClassController.updateClass)
classRouter.delete('/delete/:class_id', ClassController.deleteClass)

export default classRouter
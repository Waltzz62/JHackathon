import express from 'express'
import * as ScheduleController from '../controllers/schedule.controller'

const scheduleRouter = express.Router()

scheduleRouter.post('/create', ScheduleController.createSchedule)
scheduleRouter.get('/schedules', ScheduleController.getAllSchedule)
scheduleRouter.get('/schedule/:class_id', ScheduleController.getScheduleByClassId)
scheduleRouter.put('/update/:schedule_id', ScheduleController.updateSchedule)
scheduleRouter.delete('/delete/:schedule_id', ScheduleController.deleteSchedule)

export default scheduleRouter
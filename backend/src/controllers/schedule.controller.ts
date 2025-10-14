import { Request, Response } from "express";
import * as ScheduleModel from '../models/schedule.model'
import * as ScheduleType from "../types/schedule.type"

export const createSchedule = async (req: Request<{},{},ScheduleType.createSchedule>, res: Response) => {
    try {
        const data = req.body
        const schedule = await ScheduleModel.createSchedule(data)
        res.status(200).json({
            message: 'Created schedule successfully',
            data: schedule
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to create schedule',
            error: error.message
        })
    }
}

export const getAllSchedule = async (req: Request, res: Response) => {
    try {
        const schedules = await ScheduleModel.getAllSchedule()
        res.status(200).json({
            message: 'Fetch schedules successfully',
            data: schedules
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to fetch schedules',
            error: error.message
        })
    }
}

export const getScheduleByClassId = async (req: Request<ScheduleType.classId,{},{}>, res: Response) => {
    try {
        const class_id = req.params.class_id
        const schedules = await ScheduleModel.getScheduleByClassId(class_id)
        res.status(200).json({
            message: 'Fetch schedules successfully',
            data: schedules
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to fetch schedules',
            error: error.message
        })
    }
}

export const updateSchedule = async (req: Request<ScheduleType.scheduleId, {}, ScheduleType.updateSchedule>, res: Response) => {
    try {
        const schedule_id = req.params.schedule_id
        const data = req.body
        const schedule = await ScheduleModel.updateSchedule(schedule_id, data)
        if(!schedule){
            return res.status(404).json({
                message: 'Schedule not found'
            })
        }
        res.status(200).json({
            message: 'Updated schedule successfully',
            data: schedule
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to update schedule',
            error: error.message
        })
    }
}

export const deleteSchedule = async (req: Request<ScheduleType.scheduleId,{},{}>, res: Response) => {
    try {
        const schedule_id = req.params.schedule_id
        const schedule = await ScheduleModel.deleteSchedule(schedule_id)
        if(!schedule){
            return res.status(404).json({
                message: 'Schedule not found'
            })
        }
        res.status(200).json({
            message: 'Deleted schedule successfully',
            data: schedule
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to delete schedule',
            error: error.message
        })
    }
}
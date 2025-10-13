import { Request, Response } from "express";
import * as StaffModel from "../models/staff.model"
import * as StaffType from "../types/staff.type"

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staffs = await StaffModel.getAllStaff()
        res.status(200).json({
            message: 'Fetch staffs successfully',
            data: staffs
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to fetch staffs', 
            error: error.message 
        })
    }
}

export const updateStaff = async (req: Request<StaffType.staffId, {}, StaffType.updateStaff>, res: Response) => {
    try {
        const staffId = req.params.id
        const staffData = req.body
        const staff = await StaffModel.updateStaff(staffId, staffData)
        if(!staff || staff.length === 0){
            res.status(404).json({
            message: 'Staff not found',
            })
        }
        res.status(200).json({
            message: 'Update staff successfully',
            data: staff
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to update staff', 
            error: error.message 
        })
    }
}

export const deleteStaff = async (req: Request<StaffType.staffId, {}, {}>, res: Response) => {
    try {
        const staffId = req.params.id
        const staff = await StaffModel.deleteStaff(staffId)
        if(!staff || staff.length === 0){
            res.status(404).json({
            message: 'Staff not found',
            })
        }
        res.status(200).json({
            message: 'Delete staff successfully',
            data: staff
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to delete staff', 
            error: error.message 
        })
    }
}
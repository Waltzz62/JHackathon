import { Request, Response } from "express";
import * as ApplyModel from "../models/apply.model"
import * as ApplyType from "../types/apply.type"
import * as StaffModel from "../models/staff.model"
import * as StaffType from "../types/staff.type"

export const getAllApply = async (req: Request, res: Response) => {
    try {
        const applies = await ApplyModel.getAllApply()
        res.status(200).json({
            message: 'Fetch applies successfully',
            data: applies
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to fetch applies', 
            error: error.message
        })
    }
}

export const createApply = async (req: Request<{},{},ApplyType.createApply>, res: Response) => {
    try {
        const data = req.body
        const apply = await ApplyModel.createApply(data)
        res.status(200).json({
            message: 'Create apply successfully',
            data: apply
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to create apply', 
            error: error.message 
        })
    }
}

export const updateApplyStatus = async (req: Request<ApplyType.applyId,{},ApplyType.updateApplyStatus>, res: Response) => {
    try {
        const apply_id = req.params.id
        const status = req.body.status
        const apply = await ApplyModel.updateApplyStatus(apply_id, status)
        res.status(200).json({
            message: 'Update apply successfully',
            data: apply
        })
        if(apply[0].apply_status === "accept"){
            try {
                const staffData: StaffType.createStaff = {
                staff_bio: apply[0].apply_bio, 
                staff_special: apply[0].apply_special,
                user_id: apply[0].user_id
                }
                const staff = await StaffModel.createStaff(staffData)
                res.status(200).json({
                    message: 'Create staff successfully',
                    data: staff
                })
            } catch (error: any) {
                res.status(500).json({ 
                    message: 'Failed to create staff', 
                    error: error.message 
                })
            }
        }
        else if(apply[0].apply_status === "decline"){
            try {
                const delt = await ApplyModel.deleteApply(apply[0].apply_id)
                res.status(200).json({
                    message: 'Delete apply successfully',
                    data: delt
                })
            } catch (error: any) {
                res.status(500).json({ 
                    message: 'Failed to delete apply', 
                    error: error.message 
                })
            }
        }
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to update apply', 
            error: error.message 
        })
    }
}


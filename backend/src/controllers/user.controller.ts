import { Request, Response } from "express";
import * as UserModel from '../models/user.model'
import * as UserType from "../types/user.type"

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.getAllUser()
        res.status(200).json({
            message: 'Fetch users successfully',
            data: users
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to fetch users', 
            error: error.message 
        })
    }
}

export const createUser = async (req: Request<{},{},UserType.createUser>, res: Response) => {
    try {
        const data = req.body
        const user = await UserModel.createUser(data)
        res.status(200).json({
            message: 'Created user successfully',
            data: user
        })
        
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to create user', 
            error: error.message 
        })
    }
}

export const updateUser = async (req: Request<UserType.userId, {}, UserType.updateUser>, res: Response) => {
    try {
        const user_id = req.params.id
        const data = req.body
        const user = await UserModel.updateUser(user_id,data)
        if(!user || user.length === 0){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'Updated user successfully',
            data: user
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to update user', 
            error: error.message 
        })
    }
}

export const deleteUser = async (req: Request<UserType.userId,{},{}>, res: Response) => {
    try {
        const user_id = req.params.id
        const user = await UserModel.deleteUser(user_id)
        if(!user || user.length === 0){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'Deleted user successfully',
            data: user
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to delete user', 
            error: error.message 
        })
    }
}
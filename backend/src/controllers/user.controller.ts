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

export const createUser = async (req:Request, res: Response, data: UserType.createUser) => {
    try {
        const user = await UserModel.createUser(data)
        res.status(200).json({
            message: 'Create user successfully',
            data: user
        })
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to create users', 
            error: error.message 
        })
    }
}
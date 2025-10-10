import { Request, Response } from "express";
import * as UserModel from '../models/user.model'

export const getAllUserData = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.getAllUserData()
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Failed to fetch users', 
            error: error.message 
        })
    }
}
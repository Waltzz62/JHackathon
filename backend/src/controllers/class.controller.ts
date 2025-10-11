import { Request , Response } from "express";
import * as ClassModel from '../models/class.model'
import * as ClassType from '../types/class.type'

export const createClass = async( req: Request<{},{},ClassType.createClass>, res: Response) => {
    try {
        const data = req.body
        const clas = await ClassModel.createClass(data)
        res.status(200).json({
            message: 'Created class successfully',
            data: clas
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to create class',
            error: error.message
        })
    }
}

export const getAllClass = async (req: Request, res: Response) => {
    try {
        const classes = await ClassModel.getAllClass()
        res.status(200).json({
            message: 'Fetch classes successfully',
            data: classes
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to fetch classes',
            error: error.message
        })
    }
}

// export const getClassById = async (req: Request<>, res: Response) => {
//     try {
//         const clas = await ClassModel.getClassById()
//         res.status(200).json({
//             message: 'Fetch class successfully',
//             data: clas
//         })
//     } catch(error: any){
//         res.status(500).json({
//             message: 'Failed tp fetch class',
//             error: error.message
//         })
//     }
// }

export const updateClass = async (req: Request<ClassType.classId, {}, ClassType.updateClass>, res: Response) => {
    try {
        const class_id = req.params.class_id
        const data = req.body
        const clas = await ClassModel.updateClassById(class_id,data)
        if(!clas){
            return res.status(404).json({
                message: 'Class not found'
            })
        }
        res.status(200).json({
            message: 'Updated Class succesfully',
            data : clas 
        })
    } catch (error: any){
        res.status(500).json({
            message: 'failed to update class',
            error: error.message
        })
    }
} 

export const deleteClass = async (req: Request<ClassType.classId, {}, {}>, res: Response) => {
    try {
        const class_id = req.params.class_id
        const clas = await ClassModel.deleteClass(class_id)
        if(!clas){
            return res.status(404).json({
                message: 'Class not found'
            })
        }
        res.status(200).json({
            message: 'Deleted class successfully',
            data: clas
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to delete class',
            error: error.message
        })
    }
}
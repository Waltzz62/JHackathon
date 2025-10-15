"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.getAllClass = exports.createClass = void 0;
const ClassModel = __importStar(require("../models/class.model"));
const createClass = async (req, res) => {
    try {
        const data = req.body;
        const clas = await ClassModel.createClass(data);
        res.status(200).json({
            message: 'Created class successfully',
            data: clas
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create class',
            error: error.message
        });
    }
};
exports.createClass = createClass;
const getAllClass = async (req, res) => {
    try {
        const classes = await ClassModel.getAllClass();
        res.status(200).json({
            message: 'Fetch classes successfully',
            data: classes
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch classes',
            error: error.message
        });
    }
};
exports.getAllClass = getAllClass;
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
const updateClass = async (req, res) => {
    try {
        const class_id = req.params.class_id;
        const data = req.body;
        const clas = await ClassModel.updateClassById(class_id, data);
        if (!clas) {
            return res.status(404).json({
                message: 'Class not found'
            });
        }
        res.status(200).json({
            message: 'Updated Class succesfully',
            data: clas
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'failed to update class',
            error: error.message
        });
    }
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    try {
        const class_id = req.params.class_id;
        const clas = await ClassModel.deleteClass(class_id);
        if (!clas) {
            return res.status(404).json({
                message: 'Class not found'
            });
        }
        res.status(200).json({
            message: 'Deleted class successfully',
            data: clas
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete class',
            error: error.message
        });
    }
};
exports.deleteClass = deleteClass;

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
exports.deleteStaff = exports.updateStaff = exports.getAllStaff = void 0;
const StaffModel = __importStar(require("../models/staff.model"));
const getAllStaff = async (req, res) => {
    try {
        const staffs = await StaffModel.getAllStaff();
        res.status(200).json({
            message: 'Fetch staffs successfully',
            data: staffs
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch staffs',
            error: error.message
        });
    }
};
exports.getAllStaff = getAllStaff;
const updateStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const staffData = req.body;
        const staff = await StaffModel.updateStaff(staffId, staffData);
        if (!staff || staff.length === 0) {
            res.status(404).json({
                message: 'Staff not found',
            });
        }
        res.status(200).json({
            message: 'Update staff successfully',
            data: staff
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update staff',
            error: error.message
        });
    }
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const staff = await StaffModel.deleteStaff(staffId);
        if (!staff || staff.length === 0) {
            res.status(404).json({
                message: 'Staff not found',
            });
        }
        res.status(200).json({
            message: 'Delete staff successfully',
            data: staff
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete staff',
            error: error.message
        });
    }
};
exports.deleteStaff = deleteStaff;

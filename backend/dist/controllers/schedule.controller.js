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
exports.deleteSchedule = exports.updateSchedule = exports.getScheduleByClassId = exports.getAllSchedule = exports.createSchedule = void 0;
const ScheduleModel = __importStar(require("../models/schedule.model"));
const createSchedule = async (req, res) => {
    try {
        const data = req.body;
        const schedule = await ScheduleModel.createSchedule(data);
        res.status(200).json({
            message: 'Created schedule successfully',
            data: schedule
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create schedule',
            error: error.message
        });
    }
};
exports.createSchedule = createSchedule;
const getAllSchedule = async (req, res) => {
    try {
        const schedules = await ScheduleModel.getAllSchedule();
        res.status(200).json({
            message: 'Fetch schedules successfully',
            data: schedules
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch schedules',
            error: error.message
        });
    }
};
exports.getAllSchedule = getAllSchedule;
const getScheduleByClassId = async (req, res) => {
    try {
        const class_id = req.params.class_id;
        const schedules = await ScheduleModel.getScheduleByClassId(class_id);
        res.status(200).json({
            message: 'Fetch schedules successfully',
            data: schedules
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch schedules',
            error: error.message
        });
    }
};
exports.getScheduleByClassId = getScheduleByClassId;
const updateSchedule = async (req, res) => {
    try {
        const schedule_id = req.params.schedule_id;
        const data = req.body;
        const schedule = await ScheduleModel.updateSchedule(schedule_id, data);
        if (!schedule) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }
        res.status(200).json({
            message: 'Updated schedule successfully',
            data: schedule
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update schedule',
            error: error.message
        });
    }
};
exports.updateSchedule = updateSchedule;
const deleteSchedule = async (req, res) => {
    try {
        const schedule_id = req.params.schedule_id;
        const schedule = await ScheduleModel.deleteSchedule(schedule_id);
        if (!schedule) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }
        res.status(200).json({
            message: 'Deleted schedule successfully',
            data: schedule
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete schedule',
            error: error.message
        });
    }
};
exports.deleteSchedule = deleteSchedule;

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
exports.updateApplyStatus = exports.createApply = exports.getAllApply = void 0;
const ApplyModel = __importStar(require("../models/apply.model"));
const StaffModel = __importStar(require("../models/staff.model"));
const UserModel = __importStar(require("../models/user.model"));
const getAllApply = async (req, res) => {
    try {
        const applies = await ApplyModel.getAllApply();
        res.status(200).json({
            message: 'Fetch applies successfully',
            data: applies
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch applies',
            error: error.message
        });
    }
};
exports.getAllApply = getAllApply;
const createApply = async (req, res) => {
    try {
        const data = req.body;
        const apply = await ApplyModel.createApply(data);
        res.status(200).json({
            message: 'Create apply successfully',
            data: apply
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create apply',
            error: error.message
        });
    }
};
exports.createApply = createApply;
const updateApplyStatus = async (req, res) => {
    try {
        const apply_id = req.params.id;
        const status = req.body.status;
        const apply = await ApplyModel.updateApplyStatus(apply_id, status);
        if (!apply || apply.length === 0) {
            res.status(404).json({
                message: 'Apply not found',
            });
        }
        if (apply[0].apply_status === "accept") {
            try {
                const staffData = {
                    staff_bio: apply[0].apply_bio,
                    staff_special: apply[0].apply_special,
                    user_id: apply[0].user_id
                };
                const staff = await StaffModel.createStaff(staffData);
                await UserModel.updateUser(staffData.user_id, { user_role: "staff" });
                res.status(200).json({
                    message: 'Create staff successfully',
                    data: staff
                });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Failed to create staff',
                    error: error.message
                });
            }
        }
        else if (apply[0].apply_status === "decline") {
            try {
                const delt = await ApplyModel.deleteApply(apply[0].apply_id);
                res.status(200).json({
                    message: 'Delete apply successfully',
                    data: delt
                });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Failed to delete apply',
                    error: error.message
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update apply',
            error: error.message
        });
    }
};
exports.updateApplyStatus = updateApplyStatus;

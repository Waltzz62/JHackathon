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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUser = void 0;
const UserModel = __importStar(require("../models/user.model"));
const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.getAllUser();
        res.status(200).json({
            message: 'Fetch users successfully',
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};
exports.getAllUser = getAllUser;
const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await UserModel.createUser(data);
        res.status(200).json({
            message: 'Created user successfully',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = req.body;
        const user = await UserModel.updateUser(user_id, data);
        if (!user || user.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'Updated user successfully',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update user',
            error: error.message
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const user = await UserModel.deleteUser(user_id);
        if (!user || user.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'Deleted user successfully',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete user',
            error: error.message
        });
    }
};
exports.deleteUser = deleteUser;

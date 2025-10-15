"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.staffLogin = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../config/supabase");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        // ตรวจสอบว่า email ซ้ำหรือไม่
        const { data: existingUser } = await supabase_1.supabase
            .from('User')
            .select('user_email')
            .eq('user_email', email)
            .single();
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // สร้าง user ใหม่
        const { data: newUser, error } = await supabase_1.supabase
            .from('User')
            .insert({
            user_name: name,
            user_email: email,
            user_password: hashedPassword,
            user_tel: phone || '',
            user_role: 'user'
        })
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        // สร้าง JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser.user_id, email: newUser.user_email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: newUser.user_id,
                    name: newUser.user_name,
                    email: newUser.user_email,
                    role: newUser.user_role
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // ค้นหา user
        const { data: user, error } = await supabase_1.supabase
            .from('User')
            .select('*')
            .eq('user_email', email)
            .eq('user_role', 'user')
            .single();
        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.user_password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // สร้าง JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.user_email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.user_id,
                    name: user.user_name,
                    email: user.user_email,
                    role: user.user_role
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};
exports.login = login;
const staffLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // ค้นหา staff/admin
        const { data: user, error } = await supabase_1.supabase
            .from('User')
            .select('*')
            .eq('user_email', email)
            .in('user_role', ['staff', 'admin', 'DEV'])
            .single();
        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.user_password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // สร้าง JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.user_email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.user_id,
                    name: user.user_name,
                    email: user.user_email,
                    role: user.user_role
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};
exports.staffLogin = staffLogin;
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            success: true,
            data: {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                role: user.user_role,
                phone: user.user_tel
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get profile',
            error: error.message
        });
    }
};
exports.getProfile = getProfile;

import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/staff/login', AuthController.staffLogin);

// Protected routes
authRouter.get('/profile', authenticateToken, AuthController.getProfile);

export default authRouter;
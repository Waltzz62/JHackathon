import express from 'express'
import * as UserController from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/users',UserController.getAllUser)

export default userRouter
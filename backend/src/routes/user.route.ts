import express from 'express'
import * as UserController from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/users',UserController.getAllUser)
userRouter.post('/create',UserController.createUser)
userRouter.put('/update/:id',UserController.updateUser)
userRouter.delete('/delete/:id',UserController.deleteUser)

export default userRouter
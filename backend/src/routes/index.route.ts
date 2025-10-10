import express from 'express'
import userRouter from './user.route'

const mainRouter = express.Router()

mainRouter.use('/user',userRouter)

export default mainRouter
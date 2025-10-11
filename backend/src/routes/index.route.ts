import express from 'express'
import userRouter from './user.route'
import classRouter from './class.route'

const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/class',classRouter)

export default mainRouter
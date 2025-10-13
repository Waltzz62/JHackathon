import express from 'express'
import userRouter from './user.route'
import classRouter from './class.route'
import applyRouter from './apply.route'
import staffRouter from './staff.route'
import chatRouter from './chat.route'

const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/class', classRouter)
mainRouter.use('/apply', applyRouter)
mainRouter.use('/staff', staffRouter)
mainRouter.use('/chat', chatRouter)

export default mainRouter
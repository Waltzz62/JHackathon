import express from 'express'
import userRouter from './user.route'
import applyRouter from './apply.route'
import staffRouter from './staff.route'

const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/apply',applyRouter)
mainRouter.use('/staff', staffRouter)

export default mainRouter
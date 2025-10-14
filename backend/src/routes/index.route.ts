import express from 'express'
import userRouter from './user.route'
import classRouter from './class.route'
import applyRouter from './apply.route'
import staffRouter from './staff.route'
import scheduleRouter from './schedule.route'
import bookingRouter from './booking.route'
import chatRouter from './chat.route'

const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/class', classRouter)
mainRouter.use('/apply', applyRouter)
mainRouter.use('/staff', staffRouter)
mainRouter.use('/schedule', scheduleRouter)
mainRouter.use('/booking', bookingRouter)
mainRouter.use('/chat', chatRouter)

export default mainRouter
import express from 'express';
import * as bookingController from '../controllers/booking.controller'

const bookingRouter = express.Router()

bookingRouter.post('/create', bookingController.createBooking)
bookingRouter.get('/bookings', bookingController.getAllBooking)
bookingRouter.get('/booking/:user_id', bookingController.getBookingById)
bookingRouter.put('/update/:booking_id', bookingController.updateBooking)
bookingRouter.delete('/delete/:booking_id', bookingController.deleteBooked)

export default bookingRouter

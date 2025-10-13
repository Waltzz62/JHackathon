import { Request , Response } from "express";
import * as BookingModel from "../models/booking.model"
import * as BookingType from "../types/booking.type"

export const createBooking = async( req: Request<{}, {}, BookingType.createBooking>, res: Response ) => {
    try {
        const data = req.body
        const booking = await BookingModel.createBooking(data)
        res.status(200).json({
            message: 'Created booking successfully',
            data: booking
        })
        
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to create booking',
            error: error.message
        })
    }
}

export const getAllBooking = async (req: Request, res:Response) => {
    try {
        const bookings = await BookingModel.getAllBooking()
        res.status(200).json({
            message: 'Fetch bookings successfully',
            data: bookings
        })   
    } catch (error: any) {
       res.status(500).json({
            message: 'Failed to fetch bookings',
            error: error.message
       }) 
    }
}

export const getBookingById = async (req: Request<BookingType.userId,{},{}>, res: Response) => {
    try {
        const user_id = req.params.user_id
        const bookingById = await BookingModel.getBookingById(user_id)
        res.status(200).json({
            message: 'Fetch bookings by id successfully',
            data: bookingById
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to fetch bookings by id',
            error: error.message
        })
    }
}

export const updateBooking = async (req: Request<BookingType.bookingId, {}, BookingType.updateBooking>, res: Response) => {
    try {
        const booking_id = req.params.booking_id
        const data = req.body
        const updateBooking = await BookingModel.updateBookingById(booking_id,data)
        if(!updateBooking){
            return res.status(404).json({
                message: 'Booking not found'
            })
        }
        res.status(200).json({
            message: 'Updated Booking successfully',
            data: updateBooking
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to update booking',
            error: error.message
        })
    }
}

export const deleteBooked = async (req: Request<BookingType.bookingId, {}, {}>, res: Response) => {
    try {
        const booking_id = req.params.booking_id
        const bookingDelete = await BookingModel.deleteBookingById(booking_id)
        if(!bookingDelete){
            return res.status(404).json({
                message: 'Booking not found'
            })
        }
        res.status(200).json({
            message: 'Deleted Booking successfully',
            data: bookingDelete
        })
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to delete booking',
            error: error.message
        })
    }
}
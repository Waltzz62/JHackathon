"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooked = exports.updateBooking = exports.getBookingById = exports.getAllBooking = exports.createBooking = void 0;
const BookingModel = __importStar(require("../models/booking.model"));
const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const booking = await BookingModel.createBooking(data);
        res.status(200).json({
            message: 'Created booking successfully',
            data: booking
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create booking',
            error: error.message
        });
    }
};
exports.createBooking = createBooking;
const getAllBooking = async (req, res) => {
    try {
        const bookings = await BookingModel.getAllBooking();
        res.status(200).json({
            message: 'Fetch bookings successfully',
            data: bookings
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};
exports.getAllBooking = getAllBooking;
const getBookingById = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const bookingById = await BookingModel.getBookingById(user_id);
        res.status(200).json({
            message: 'Fetch bookings by id successfully',
            data: bookingById
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch bookings by id',
            error: error.message
        });
    }
};
exports.getBookingById = getBookingById;
const updateBooking = async (req, res) => {
    try {
        const booking_id = req.params.booking_id;
        const data = req.body;
        const updateBooking = await BookingModel.updateBookingById(booking_id, data);
        if (!updateBooking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }
        res.status(200).json({
            message: 'Updated Booking successfully',
            data: updateBooking
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update booking',
            error: error.message
        });
    }
};
exports.updateBooking = updateBooking;
const deleteBooked = async (req, res) => {
    try {
        const booking_id = req.params.booking_id;
        const bookingDelete = await BookingModel.deleteBookingById(booking_id);
        if (!bookingDelete) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }
        res.status(200).json({
            message: 'Deleted Booking successfully',
            data: bookingDelete
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete booking',
            error: error.message
        });
    }
};
exports.deleteBooked = deleteBooked;

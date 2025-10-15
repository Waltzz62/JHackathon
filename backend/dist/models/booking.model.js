"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingById = exports.updateBookingById = exports.getBookingById = exports.getAllBooking = exports.createBooking = void 0;
const supabase_1 = require("../config/supabase");
const createBooking = async (data) => {
    const { data: booking, error } = await supabase_1.supabase
        .from('Booking')
        .insert(data)
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return booking;
};
exports.createBooking = createBooking;
const getAllBooking = async () => {
    const { data, error } = await supabase_1.supabase
        .from('Booking')
        .select(`
            user_id,
            nums_student,
            status,
            notes,
            schedule : Schedule!inner (
                status,
                start_time,
                end_time,
                class:Class!inner (
                    class_title,
                    class_duration,
                    class_price
                )
            )    
        `);
    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};
exports.getAllBooking = getAllBooking;
const getBookingById = async (userId) => {
    const { data, error } = await supabase_1.supabase
        .from('Booking')
        .select(`
            user_id,
            nums_student,
            status,
            notes,
            schedule : Schedule!inner (
                status,
                start_time,
                end_time,
                class:Class!inner (
                    class_title,
                    class_duration,
                    class_price
                )
            )    
        `)
        .eq('user_id', userId);
    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};
exports.getBookingById = getBookingById;
const updateBookingById = async (booking_id, booking_data) => {
    const { schedule_id, ...safeData } = booking_data;
    const { data, error } = await supabase_1.supabase
        .from('Booking')
        .update(safeData)
        .eq('booking_id', booking_id)
        .select('*')
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateBookingById = updateBookingById;
const deleteBookingById = async (booking_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Booking')
        .delete()
        .eq('booking_id', booking_id)
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteBookingById = deleteBookingById;

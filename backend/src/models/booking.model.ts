import { supabase } from "../config/supabase";
import * as BookingType from "../types/booking.type";

export const createBooking = async ( data: BookingType.createBooking ) => {
    const { error } = await supabase
        .from('Booking')
        .insert(data)
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const getAllBooking = async () => {
    const {data, error} = await supabase
        .from('Booking')
        .select(`
            user_name,
            nums_student,
            status,
            notes,
            schedule : Schedule!inner (
                status,
                schedule_date,
                class:Class!inner (
                    class_title,
                    class_duration,
                    class_price
                )
            )    
        `)
    if (error) {
        throw new Error(error.message)
    }
    return data || []
}

export const getBookingById = async ( userId:number) => {
    const {data, error} = await supabase
      .from('Booking')
        .select(`
            user_name,
            nums_student,
            status,
            notes,
            schedule : Schedule!inner (
                status,
                schedule_date,
                class:Class!inner (
                    class_title,
                    class_duration,
                    class_price
                )
            )    
        `)
        .eq('user_id', userId)
     if (error) {
        throw new Error(error.message)
    }
    return data || []
}

export const updateBookingById = async (booking_id: number , booking_data : BookingType.updateBooking) => {
    const {data, error} = await supabase
        .from('Booking')
        .update(booking_data)
        .eq('booking_id', booking_id )
        .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data

}

export const deleteBookingById = async (booking_id: number) => {
    const {data, error} = await supabase
        .from('Booking')
        .delete()
        .eq('booking_id', booking_id )
        .select('*')
    if(error) {
        throw new Error(error.message)
    }
    return data
}
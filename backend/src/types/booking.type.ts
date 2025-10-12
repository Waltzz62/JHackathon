export type createBooking = {
    booking_id:number
    user_id:number
    user_name:string
    schedule_id:number
    nums_student:number
    status:string
    notes:string
}

export type getBookedBooking = {
    user_name:string
    nums_student:number
    status:string
    notes:string
}

export type getBookedSchedule = {
    status:string
    schedule_date:string
}

export type getBookedClass = {
    class_title:string
    class_duration:number
    class_price:number
}

export type getBookedWithDetails = getBookedBooking & {
    schedule: getBookedSchedule & {
        class: getBookedClass
    }
}
export type userId = {
    user_id:number
}

export type bookingId = {
    booking_id:number
}

export type updateBooking = {
    nums_student?:number
    status?:string
    notes?:string
}


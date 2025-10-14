
export type createSchedule = {
    class_id:number
    staff_id?:number
    status:string
    start_time:string
    end_time:string
}

export type updateSchedule = {
    staff_id?:number
    status?:string
    start_time:string
    end_time:string
}

export type scheduleId = {
    schedule_id:number
}

export type classId = {
    class_id:number
}
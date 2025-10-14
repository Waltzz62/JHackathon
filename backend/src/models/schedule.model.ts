import { supabase } from "../config/supabase";
import * as SceduleType from "../types/schedule.type"

export const createSchedule = async (scheduledata:SceduleType.createSchedule) => {
    const{ data, error} = await supabase
        .from('Schedule')
        .insert(scheduledata)
        .select()
        .single()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const updateSchedule = async (schedule_id:number, scheduledata:SceduleType.updateSchedule) => {
    const{ data, error } = await supabase
    .from('Schedule')
    .update(scheduledata)
    .eq('schedule_id', schedule_id)
    .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const getAllSchedule = async () => {
    const{data, error} = await supabase
        .from('Schedule')
        .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const getScheduleByClassId = async (class_id:number) => {
    const{data, error} = await supabase
        .from('Schedule')
        .select('*')
        .eq('class_id', class_id)
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const deleteSchedule = async (schedule_id:number) => {
    const{data, error} = await supabase
        .from('Schedule')
        .delete()
        .eq('schedule_id', schedule_id)
        .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data
}
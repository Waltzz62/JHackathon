import { supabase } from "../config/supabase";
import * as StaffType from "../types/staff.type"

export const getAllStaff = async () => {
    const { data, error } = await supabase
        .from('Staff')
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const createStaff = async (staff: StaffType.createStaff) => {
    const { data, error } = await supabase
        .from('Staff')
        .insert(staff)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const updateStaff = async (staff_id: number, staff_data: StaffType.updateStaff) => {
    const { data, error } = await supabase
        .from('Staff')
        .update(staff_data)
        .eq('staff_id',staff_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const deleteStaff = async (staff_id: number) => {
    const { data, error } = await supabase
        .from('Staff')
        .delete()
        .eq('staff_id', staff_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}
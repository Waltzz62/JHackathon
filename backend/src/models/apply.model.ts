import { supabase } from "../config/supabase";
import * as ApplyType from "../types/apply.type"

export const getAllApply = async () => {
    const { data, error } = await supabase
        .from('Apply')
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const createApply = async (apply: ApplyType.createApply) => {
    const { data, error } = await supabase
        .from('Apply')
        .insert(apply)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const updateApplyStatus = async (apply_id: number, status: string) => {
    const { data, error } = await supabase
        .from('Apply')
        .update({apply_status: status})
        .eq('apply_id', apply_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const deleteApply = async (apply_id: number) => {
    const { data, error } = await supabase
        .from('Apply')
        .delete()
        .eq('apply_id',apply_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}
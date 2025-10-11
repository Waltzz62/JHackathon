import { supabase } from "../config/supabase";
import * as ClassTypes from "../types/class.type";

export const createClass = async (data: ClassTypes.createClass) => {
    const { error } = await supabase
        .from('Class')
        .insert(data)
    if(error){
        throw new  Error(error.message)
    }
    return data
}

export const getAllClass = async () => {
    const {data, error} = await supabase
        .from('Class')
        .select('*')
    if(error){
        throw new  Error(error.message)
    }
    return data
}

// export const getClassById = async (class_id: number) => {
//     const {data, error} = await supabase
//         .from('Class')
//         .select('*')
//         .eq('class_id', class_id)
//     if(error){
//         throw new  Error(error.message)
//     }
//     return data
// }

export const updateClassById = async (class_id:number, class_data:ClassTypes.updateClass) => {
    const { data, error } = await supabase
    .from('Class')
    .update(class_data)
    .eq('class_id', class_id)
    .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const deleteClass = async(class_id:number) => {
    const{data, error} = await supabase
        .from('Class')
        .delete()
        .eq('class_id' , class_id)
        .select('*')
    if(error){
        throw new Error(error.message)
    }
    return data
}
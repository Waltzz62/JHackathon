import { supabase } from "../config/supabase";
import * as UserType from "../types/user.type"

export const getAllUser = async () => {
    const {data, error} = await supabase
        .from('User')
        .select('*')
    if(error){
        throw new  Error(error.message)
    }
    return data
}

export const createUser = async (data: UserType.createUser) => {
    const { error } = await supabase
        .from('User')
        .insert({data})
    if(error){
        throw new  Error(error.message)
    }
}
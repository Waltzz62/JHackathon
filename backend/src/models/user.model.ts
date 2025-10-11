import { supabase } from "../config/supabase";

export const getAllUser = async () => {
    const {data, error} = await supabase
        .from('User')
        .select('*')
    if(error){
        throw new  Error(error.message)
    }
    return data
}
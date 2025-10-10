import { supabase } from "../config/supabase";

export const getAllUserData = async () => {
    const {data, error} = await supabase
        .from('user')
        .select('*')
    if(error){
        throw new  Error(error.message)
    }
    return data
}
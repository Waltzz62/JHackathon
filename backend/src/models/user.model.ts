import { supabase } from "../config/supabase";
import * as UserType from "../types/user.type"
import { hashPassword } from "../middleware/hash";

export const getAllUser = async () => {
    const {data, error} = await supabase
        .from('User')
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const createUser = async (user: UserType.createUser) => {
  const hash = await hashPassword(user.user_password)
  const newUser = {
    ...user,
    user_password: hash
  }
  const { data, error } = await supabase
    .from('User')
    .insert([newUser])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateUser = async (user_id: number,user_data: UserType.updateUser) => {
    const {data, error} = await supabase
        .from('User')
        .update(user_data)
        .eq('user_id',user_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

export const deleteUser = async (user_id: number) => {
    const {data, error} = await supabase
        .from('User')
        .delete()
        .eq('user_id',user_id)
        .select()
    if(error){
        throw new Error(error.message)
    }
    return data
}

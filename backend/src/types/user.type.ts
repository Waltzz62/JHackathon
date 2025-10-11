export type createUser = {
    user_name:String
    user_email:String
    user_password:String
    user_tel:String
}

export type updateUser = {
    user_name?:String
    user_email?:String
    user_password?:String
    user_tel?:String
    user_role?:String
}

export type userId = {
    id:number
}
export type createUser = {
    user_name: string
    user_email: string
    user_password: string
    user_tel: string
}

export type updateUser = {
    user_name?: string
    user_email?: string
    user_password?: string
    user_tel?: string
    user_role?: string
}

export type userId = {
    id: number
}
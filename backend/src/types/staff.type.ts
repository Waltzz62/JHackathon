export type createStaff = {
    staff_bio: string
    staff_special: string
    user_id: number
}

export type updateStaff = {
    staff_bio?: string
    staff_special?: string
}

export type staffId = {
    id: number
}
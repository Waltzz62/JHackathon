export type createClass = {
    class_title:String
    class_description:String
    class_duration:number
    class_price:number
    max_student:number
    class_image:String
    staff_id?:number
}

export type updateClass = {
    class_title?:String
    class_description?:String
    class_duration?:number
    class_price?:number
    max_student?:number
    class_image?:String
    staff_id?:number
}

export type classId = {
    class_id:number
}
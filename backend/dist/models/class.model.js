"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClassById = exports.getAllClass = exports.createClass = void 0;
const supabase_1 = require("../config/supabase");
const createClass = async (data) => {
    const { error } = await supabase_1.supabase
        .from('Class')
        .insert(data);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.createClass = createClass;
const getAllClass = async () => {
    const { data, error } = await supabase_1.supabase
        .from('Class')
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getAllClass = getAllClass;
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
const updateClassById = async (class_id, class_data) => {
    const { data, error } = await supabase_1.supabase
        .from('Class')
        .update(class_data)
        .eq('class_id', class_id)
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateClassById = updateClassById;
const deleteClass = async (class_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Class')
        .delete()
        .eq('class_id', class_id)
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteClass = deleteClass;

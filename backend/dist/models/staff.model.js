"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getAllStaff = void 0;
const supabase_1 = require("../config/supabase");
const getAllStaff = async () => {
    const { data, error } = await supabase_1.supabase
        .from('Staff')
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getAllStaff = getAllStaff;
const createStaff = async (staff) => {
    const { data, error } = await supabase_1.supabase
        .from('Staff')
        .insert(staff)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.createStaff = createStaff;
const updateStaff = async (staff_id, staff_data) => {
    const { data, error } = await supabase_1.supabase
        .from('Staff')
        .update(staff_data)
        .eq('staff_id', staff_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateStaff = updateStaff;
const deleteStaff = async (staff_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Staff')
        .delete()
        .eq('staff_id', staff_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteStaff = deleteStaff;

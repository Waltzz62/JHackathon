"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApply = exports.updateApplyStatus = exports.createApply = exports.getAllApply = void 0;
const supabase_1 = require("../config/supabase");
const getAllApply = async () => {
    const { data, error } = await supabase_1.supabase
        .from('Apply')
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getAllApply = getAllApply;
const createApply = async (apply) => {
    const { data, error } = await supabase_1.supabase
        .from('Apply')
        .insert(apply)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.createApply = createApply;
const updateApplyStatus = async (apply_id, status) => {
    const { data, error } = await supabase_1.supabase
        .from('Apply')
        .update({ apply_status: status })
        .eq('apply_id', apply_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateApplyStatus = updateApplyStatus;
const deleteApply = async (apply_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Apply')
        .delete()
        .eq('apply_id', apply_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteApply = deleteApply;

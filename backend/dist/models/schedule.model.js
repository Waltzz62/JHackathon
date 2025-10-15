"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.getScheduleByClassId = exports.getAllSchedule = exports.updateSchedule = exports.createSchedule = void 0;
const supabase_1 = require("../config/supabase");
const createSchedule = async (scheduledata) => {
    const { data, error } = await supabase_1.supabase
        .from('Schedule')
        .insert(scheduledata)
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.createSchedule = createSchedule;
const updateSchedule = async (schedule_id, scheduledata) => {
    const { data, error } = await supabase_1.supabase
        .from('Schedule')
        .update(scheduledata)
        .eq('schedule_id', schedule_id)
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateSchedule = updateSchedule;
const getAllSchedule = async () => {
    const { data, error } = await supabase_1.supabase
        .from('Schedule')
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getAllSchedule = getAllSchedule;
const getScheduleByClassId = async (class_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Schedule')
        .select('*')
        .eq('class_id', class_id);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getScheduleByClassId = getScheduleByClassId;
const deleteSchedule = async (schedule_id) => {
    const { data, error } = await supabase_1.supabase
        .from('Schedule')
        .delete()
        .eq('schedule_id', schedule_id)
        .select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteSchedule = deleteSchedule;

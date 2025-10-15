"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUser = void 0;
const supabase_1 = require("../config/supabase");
const hash_1 = require("../middleware/hash");
const getAllUser = async () => {
    const { data, error } = await supabase_1.supabase
        .from('User')
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.getAllUser = getAllUser;
const createUser = async (user) => {
    const hash = await (0, hash_1.hashPassword)(user.user_password);
    const newUser = {
        ...user,
        user_password: hash
    };
    const { data, error } = await supabase_1.supabase
        .from('User')
        .insert([newUser])
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.createUser = createUser;
const updateUser = async (user_id, user_data) => {
    const { data, error } = await supabase_1.supabase
        .from('User')
        .update(user_data)
        .eq('user_id', user_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.updateUser = updateUser;
const deleteUser = async (user_id) => {
    const { data, error } = await supabase_1.supabase
        .from('User')
        .delete()
        .eq('user_id', user_id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
exports.deleteUser = deleteUser;

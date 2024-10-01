import { supabase } from '../database.js';
class Profile{
    async selectUser(id_user){
        const { data: user, error } = await supabase
        .from('users')
        .select('username, password, email, tel, dt_birth, genre') 
        .eq('user_id', id_user);

        if(user){
            return user; 
        } else {
            return error;
        }
    }

    async updateUser(id_user, updatedFields) {
        const { data: user, error } = await supabase
        .from('users')
        .update(updatedFields)
        .eq('user_id', id_user);

        if(user){
            return user
        } else {
            return error;
        }
    }
    

    async deleteUser(id_user){
        const {data: user, error} = await supabase
        .from('users')
        .delete()
        .eq('user_id', id_user)

        return user;
    }
}

export default Profile;
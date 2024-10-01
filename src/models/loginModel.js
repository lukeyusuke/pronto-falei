import { supabase } from '../database.js';
class Login{
   async listUsers() {
      const { data, error } = await supabase
         .from('users')
         .select('*')
   }

   async checkEmailPasswordExists(email, password){
      const { data: user, error } = await supabase
        .from('users')
        .select('user_id, username, email, password')
        .eq('email', email)
        .eq('password', password) 

      if(user){
         return user
      } else {
         return error
      }
   }
}

export default Login;
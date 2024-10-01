import { supabase } from '../database.js';
class Register{
   async create(username, email, password, tel, dt_birth, genre){
      const { data: user, error } = await supabase
      .from('users')
      .insert([{ 
         username, 
         email, 
         password,
         tel,
         dt_birth,
         genre,
      }]);

      return user;
   }

   async checkEmailExists(email){
      const { data: emailUser, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();
      
      if(emailUser) return emailUser;
   }

   async checkPhoneNumberExists(tel){
      const { data: telUser, error } = await supabase
      .from('users')
      .select('tel')
      .eq('tel', tel)
      .single();

   if(telUser) return telUser;
   
   }
}

export default Register;
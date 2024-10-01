import { supabase } from '../database.js';

class Vent{
   async listVents() {
      const { data, error } = await supabase
         .from('reports')
         .select('*')
   }

   async create(title, subtitle, main_text){
      const { data: vent, error } = await supabase
      .from('reports')
      .insert([{ 
         title, 
         subtitle, 
         main_text,
      }]);

      return vent;
   }
}

export default Vent;
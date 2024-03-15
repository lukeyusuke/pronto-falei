import { databaseConnection } from "../database.js";

class Vent{
   listVents() {
      const sql = "SELECT * FROM reports";

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) reject(err);
            resolve(result);
         })
      })
   }

   create(title, subtitle, main_text){
      const sql = `INSERT INTO reports (title, subtitle, main_text) values ('${title}', '${subtitle}', '${main_text}')`;

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Não deu para concluir a postagem do relato');
            resolve(result);
         })
      })
   }
}

export default Vent;
import { databaseConnection } from "../database.js";

class Register{
   create(username, email, user_password, tel, dt_birth, genre){
      const sql = `INSERT INTO users (username, email, user_password, tel, dt_birth, genre) values ('${username}', '${email}', '${user_password}', '${tel}', '${dt_birth}', '${genre}')`;
      
      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log(err);
            resolve(result);
         })
      })
   }

   checkEmailExists(email){
      const sql = `SELECT email from users WHERE email = '${email}'`

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim na consulta ao BD');
            resolve(result);
         })
      })
   }

   checkPhoneNumberExists(tel){
      const sql = `SELECT tel from users WHERE tel = '${tel}'`

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim na consulta ao BD');
            resolve(result);
         })
      })
   }
}

export default Register;
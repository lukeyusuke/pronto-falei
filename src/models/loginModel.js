import { databaseConnection } from "../database.js";

class Login{
   listUsers() {
      const sql = "SELECT * FROM users";

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) reject(err);
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

   checkEmailPasswordExists(email){
      const sql = `SELECT id_user, email, user_password from users WHERE email = '${email}'`;

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim na consulta ao BD');
            resolve(result);
         })
      })
   }
}

export default Login;
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

   checkEmailPasswordExists(email, user_password){
      const sql = `SELECT id_user, username, email, user_password from users WHERE email = '${email}' AND user_password = '${user_password}'`;

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim na consulta ao BD');
            resolve(result);
         })
      })
   }
}

export default Login;
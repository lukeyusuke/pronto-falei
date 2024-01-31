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

   create(username, email, user_password, tel, dt_birth, genre){
      const sql = `INSERT INTO users (username, email, user_password, tel, dt_birth, genre) values ('${username}', '${email}', '${user_password}', '${tel}', '${dt_birth}', '${genre}')`;
      
      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim');
            resolve(result);
         })
      })   
   }

   checkEmailExists(email){
      const sql = `SELECT email from users WHERE email = '${email}'`

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim no email boy');
            resolve(result);
         })
      })
   }

   checkPhoneNumberExists(tel){
      const sql = `SELECT tel from users WHERE tel = '${tel}'`

      return new Promise((resolve, reject) => {
         databaseConnection.query(sql, (err, result) => {
            if(err) console.log('Deu ruim no email boy');
            resolve(result);
         })
      })
   }
}

// 1 - Percorrer o BD para verificar se o email já existe
// 2 - Caso exista, enviar uma resposta para loginController
// 3 - Caso não exista, não enviar nada e deixar como está

// 1 - Posso fazer a condicional no Model (resolver diretamente no model)
// 1 - Posso chamar o método separado e chamar no login-register (esse é oq eu quero)

export default Login;
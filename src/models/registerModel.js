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
}

export default Register;
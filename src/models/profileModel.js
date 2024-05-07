import { databaseConnection } from "../database.js";

class Profile{
    selectUser(id_user){
        const sql = `SELECT username, user_password, email, tel, dt_birth, genre FROM users WHERE id_user = ${id_user}`;

        return new Promise((resolve, reject) => {
            databaseConnection.query(sql, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }

    delete(id_user){
        const sql = `delete from users WHERE id_user = ${id_user}`;
      
        return new Promise((resolve, reject) => {
            databaseConnection.query(sql, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }
}

export default Profile;
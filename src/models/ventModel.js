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
}

export default Vent;
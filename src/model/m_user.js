const client = require("../config/postgre");

module.exports = {
  getAllUserModel: () => {
    return new Promise((resolve, reject) => {
      client.query("SELECT * FROM users", (error, result) => {
        if (!error) {
          resolve(result.rows);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  getUserByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
        if (!error) {
          resolve(result.rows);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  postNewUserModel: (data, photo) => {
    return new Promise((resolve, reject) => {
      client.query(
        "INSERT INTO users (first_name, last_name, email, tgl_lahir, gender, photo_profil, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, last_name, email, tgl_lahir, gender, photo_profil, username, password",
        [
          data.first_name,
          data.last_name,
          data.email,
          data.tgl_lahir,
          data.gender,
          photo,
          data.username,
          data.password,
        ],
        (error, result) => {
          if (!error) {
            resolve(result.rows);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  loginUserModel: (username) => {
    return new Promise((resolve, reject) => {
      client.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  patchUserProfilModel: (data, id, photo) => {
    return new Promise((resolve, reject) => {
      client.query(
        `UPDATE users SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', tgl_lahir = '${data.tgl_lahir}', gender = '${data.gender}', photo_profil = '${photo}' WHERE id = ${id}
            RETURNING id, first_name, last_name, email, tgl_lahir, gender, photo_profil`,
        (error, result) => {
          if (!error) {
            resolve(result.rows);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  patchUserPasswordModel: (setPass, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [setPass, id],
        (error) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setPass,
            };
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },

  


};

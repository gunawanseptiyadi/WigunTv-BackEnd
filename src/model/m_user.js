const client = require("../config/postgre");

module.exports = {
  getAllUserModel: () => {
    return new Promise((resolve, reject) => {
      client.query("SELECT * FROM user", (error, result) => {
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
        "INSERT INTO user VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, last_name, email, tgl_lahir, gender, photo_profil, username, password",
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

  patchUserProfilModel: () => {},

  patchUserPasswordModel: () => {},

  postLoginUserModel: () => {},

  getUserById: () => {},
};

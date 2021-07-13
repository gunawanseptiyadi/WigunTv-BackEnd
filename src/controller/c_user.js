const response = require("../helper/response");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { getAllUserModel, postNewUserModel } = require("../model/m_user");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const result = await getAllUserModel();
      return response.response(
        res,
        200,
        "Success get all register data",
        result
      );
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },

  postNewUser: async (req, res) => {
    try {
      if (req.body.gender == "Male" || req.body.gender == "Female") {
        const {
          first_name,
          last_name,
          email,
          tgl_lahir,
          gender,
          username,
          password
        } = req.body
        const salt = bcrypt.genSaltSync(5);
        const encryptPassword = bcrypt.hashSync(password, salt);
        const setData = {
          first_name,
          last_name,
          email,
          tgl_lahir,
          gender,
          photo_profil: req.file === undefined ? '' : req.file.filename,
          username,
          password: encryptPassword
        }    
        const result = await postNewUserModel(setData);         
        return response.response(res, 200, "Success register Users", result);
      } else {
        return response.response(res, 400, "Gender is undefined");
      }
    } catch (error) {
      console.log(error);
      return response.response(res, 400, "Bad Request", error);
    }
  },
};

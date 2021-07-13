const response = require("../helper/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getAllUserModel, postNewUserModel, patchUserProfilModel, patchUserPasswordModel, loginUserModel, getUserByIdModel } = require("../model/m_user");

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

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getUserByIdModel(id);
      return response.response(
        res,
        200,
        `Success get register id data = ${id}`,
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

        const { photo } = req.file.filename
        const salt = bcrypt.genSaltSync(5);
        const encryptPassword = bcrypt.hashSync(password, salt);
        const setData = {
          first_name,
          last_name,
          email,
          tgl_lahir,
          gender,
          photo,
          username,
          password: encryptPassword
        }    
        const result = await postNewUserModel(setData, req.file.filename);         
        return response.response(res, 200, "Success register User baru", result);
      } else {
        return response.response(res, 400, "Gender is undefined");
      }
    } catch (error) {
      console.log(error);
      return response.response(res, 400, "Bad Request", error);
    }
  },

  patchUserProfil: async (req, res) => {
    try {
        const {
          first_name,
          last_name,
          email,
          tgl_lahir,
          gender,
        } = req.body
        const { photo } = req.file.filename
        const setData = {
          first_name,
          last_name,
          email,
          tgl_lahir,
          gender,
          photo
        }
        const checkId = await getUsersByIdModel(id);
        if (checkId.length > 0) {
          const result = await patchUserProfilModel(setData, req.params.id, req.file.filename);
          return response.response(res, 200, `Success update data profil with id : ${req.params.id}`, result);
        } else {
          return response.response(res, 404, `Profil By Id : ${id} Not Found`);
        }
    } catch (error) {
      return response.response(res, 400, "Bad Request");
    }
  },

  patchUserPassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      const setPass = {
        password: encryptPassword,
      };
      const checkId = await getUsersByIdModel(id);
      if (checkId.length > 0) {
        const result = await patchUserPasswordModel(setPass, id);
        return response.response(res, 200, "Success Patch User Data", result);
      } else {
        return response.response(res, 404, `Password By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return response.response(res, 400, "Bad Request", error);
    }
  },

  loginUser: async (req, res) => {
    try {
      console.log(req.body);
      const { username, password } = req.body;
      const checkDataUser = await loginUserModel(username);
      console.log(checkDataUser);
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        );
        if (checkPassword) {
          const { username } = checkDataUser[0]
          const payload = { username }
          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '30m' })
          const result = { ...payload, token }

          return response.response(res, 200, "You are Loging in !", result);
        } else {
          return response.response(res, 400, "Password Incorrect !");
        }
      } else {
        return response.response(res, 400, "username not registered !");
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },






};

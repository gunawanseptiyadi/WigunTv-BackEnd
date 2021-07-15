const router = require("express").Router();

const { authorization } = require("../middleware/auth")

const {
  getAllUser,
  getUserById,
  postNewUser,
  patchUserProfil,
  patchUserPassword,
  loginUser
} = require("../controller/c_user");

const uploadPhoto = require("../middleware/multerProfile");

router.get("/", authorization, getAllUser);

router.post("/register", uploadPhoto, postNewUser);

router.patch("/:id", authorization, uploadPhoto, patchUserProfil);

router.patch("/changePassword/:id", authorization, patchUserPassword);

router.post("/login", loginUser);

router.get("/:id", authorization, getUserById);

module.exports = router;

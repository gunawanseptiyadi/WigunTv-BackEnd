const router = require('express').Router();

const { getAllUser, postNewUser } = require('../controller/c_user')

const uploadPhoto = require('../middleware/multerProfile')

router.get('/', getAllUser);

router.post('/register', uploadPhoto, postNewUser);

module.exports = router;
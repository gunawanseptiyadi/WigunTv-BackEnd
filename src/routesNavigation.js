const router = require("express").Router();

const users = require('./routes/r_user')

router.use('/users', users)

module.exports = router;
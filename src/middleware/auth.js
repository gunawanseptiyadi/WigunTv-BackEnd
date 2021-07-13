const response = require('../helper/response')
const jwt = require('jsonwebtoken')

module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return response.response(res, 403, error.message)
        } else {
          req.decodetoken = result
          next()
        }
      })
    } else {
      return response.response(res, 403, 'Please Login First !')
    }
  },
}

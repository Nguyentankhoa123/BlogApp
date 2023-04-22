const jwt = require('jsonwebtoken')

const authenToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization']
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1]
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      next()
    } else {
      res.status(401).json({ message: 'Unauthorized User' })
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Unauthorized User' })
  }
}

module.exports = authenToken

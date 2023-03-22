const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  
  const user = await User.findOne({ username })
// First checks if user exists, else checks for password match
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  
  const userForToken = {
    username: user.username,
    id: user._id,
  }


// //   If the password is correct, a token is created with the method jwt.sign. 
// //   The token contains the username and the user id in a digitally signed form. 
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

  response.status(200).end()
})

module.exports = loginRouter;
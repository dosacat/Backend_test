const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');



usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username }) //Search if user exists here
    if (existingUser)  {    
        return response.status(400).json({      
            error: 'username must be unique'    
        })  }
    else if (!username||!password){
        return response.status(400).json({      
            error: 'Incomplete Fields'    
        })
    }
    else if (username.length<3||password.length<3){
        return response.status(400).json({      
            error: 'Username and password must be atleast 3 characters long'    
        })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username,
        name,
        passwordHash,
        })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  })
  
  module.exports = usersRouter;
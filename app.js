const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const config = require('./utils/config');

const mongoose = require('mongoose');

//R O U T E R S

//To deal with users
const usersRouter = require('./controllers/users');
// To deal with Login
const loginRouter = require('./controllers/login.js');
// To deal with errors and request loggers.
const middleware = require('./utils/middleware.js');



//middleware
app.use(express.json());
app.use(middleware.getTokenFrom);



// Connecting to Mongoose
mongoose.set('strictQuery', false)
console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



// USING ALL IMPORTED ROUTERS
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter);


//USING MIDDLEWARE

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



module.exports= app;
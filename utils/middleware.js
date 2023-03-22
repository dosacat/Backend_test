
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


const getTokenFrom = (req,res,next) => {  
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('bearer ')) {
    req.token = authorization.replace('bearer ', '') ;
    return next()
  }
  else{
    req.token=null;
    next()
  }   
}


module.exports = {
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
}
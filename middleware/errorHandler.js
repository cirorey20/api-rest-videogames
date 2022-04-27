// const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  console.log('logErrors');
  next(err)
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');//para saber el orden en que se ejecuta
  res.status(202).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  logErrors,
  errorHandler
}
  
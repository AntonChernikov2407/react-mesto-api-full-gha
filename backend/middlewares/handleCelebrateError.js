const { isCelebrateError } = require('celebrate');

const handleCelebrateError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    let celebrateError;
    if (err.details.has('params')) {
      celebrateError = err.details.get('params');
    }
    if (err.details.has('body')) {
      celebrateError = err.details.get('body');
    }
    res
      .status(400)
      .send({ message: celebrateError.details.map((error) => error.message).toString() });
  }
  next(err);
};

module.exports = handleCelebrateError;

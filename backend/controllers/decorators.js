const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

const cache = new Map();

const findUserById = (userId, res, next) => {
  const cachedData = cache.get(userId);
  if (cachedData) {
    res.send(cachedData);
  } else {
    User.findById(userId)
      .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
      .then((data) => {
        cache.set(userId, data);
        res.send(data);
      })
      .catch(next);
  }
};

const updateUserProfile = (req, res, next, body) => User
  .findByIdAndUpdate(req.user._id, body, { new: true, runValidators: true })
  .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  .then((data) => res.send(data))
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  });

module.exports = {
  findUserById,
  updateUserProfile,
};

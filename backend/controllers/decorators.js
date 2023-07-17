const mongoose = require('mongoose');
const User = require('../models/user');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

const findUserById = (userId, res, next) => User
  .findById(userId)
  .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  .then((data) => res.send(data))
  .catch(next);

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

const changeLikeState = (req, res, next, param) => Card
  .findByIdAndUpdate(req.params.cardId, param, { new: true })
  .orFail(new NotFoundError('Карточка с указанным id не найдена'))
  .populate(['owner', 'likes'])
  .then((data) => res.send(data))
  .catch(next);

module.exports = {
  findUserById,
  updateUserProfile,
  changeLikeState,
};

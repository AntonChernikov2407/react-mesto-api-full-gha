const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');
const { changeLikeState } = require('./decorators');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((data) => res.send(data))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять карточки других пользователй');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => data
      .populate('owner')
      .then(() => res.status(201).send(data)))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const putLikeById = (req, res, next) => {
  const param = { $addToSet: { likes: req.user._id } };
  return changeLikeState(req, res, next, param);
};

const deleteLikeById = (req, res, next) => {
  const param = { $pull: { likes: req.user._id } };
  return changeLikeState(req, res, next, param);
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
};

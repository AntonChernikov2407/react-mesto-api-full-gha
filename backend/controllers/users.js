const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');
const { findUserById, updateUserProfile } = require('./decorators');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((data) => res.send(data))
  .catch(next);

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  return findUserById(userId, res, next);
};

const getThisUserById = (req, res, next) => {
  const userId = req.user._id;
  return findUserById(userId, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, name, about, avatar, email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const updateProfileById = (req, res, next) => {
  const { name, about } = req.body;
  return updateUserProfile(req, res, next, { name, about });
};

const updateAvatarById = (req, res, next) => {
  const { avatar } = req.body;
  return updateUserProfile(req, res, next, { avatar });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  getThisUserById,
  createUser,
  updateProfileById,
  updateAvatarById,
  login,
};

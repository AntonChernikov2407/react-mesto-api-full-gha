const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const pattern = require('../utils/pattern');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(pattern),
  }),
}), createUser);
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));
// eslint-disable-next-line no-unused-vars
router.use('*', auth, (req, res) => { throw new NotFoundError('Страница не найдена'); });
module.exports = router;

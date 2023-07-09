const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const pattern = require('../utils/pattern');
const {
  getUsers,
  getUserById,
  getThisUserById,
  updateProfileById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/me', getThisUserById);
router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileById);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern),
  }),
}), updateAvatarById);

module.exports = router;

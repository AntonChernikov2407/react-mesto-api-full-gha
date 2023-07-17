const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const reqValidation = require('../utils/reqValidation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', reqValidation.signin, login);
router.post('/signup', reqValidation.signup, createUser);
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));
// eslint-disable-next-line no-unused-vars
router.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));
module.exports = router;

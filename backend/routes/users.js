const router = require('express').Router();
const reqValidation = require('../utils/reqValidation');
const {
  getUsers,
  getUserById,
  getThisUserById,
  updateProfileById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/me', getThisUserById);
router.get('/', getUsers);
router.get('/:userId', reqValidation.userId, getUserById);
router.patch('/me', reqValidation.me, updateProfileById);
router.patch('/me/avatar', reqValidation.avatar, updateAvatarById);

module.exports = router;

const router = require('express').Router();
const reqValidation = require('../utils/reqValidation');
const {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', reqValidation.cardId, deleteCardById);
router.post('/', reqValidation.card, createCard);
router.put('/:cardId/likes', reqValidation.likes, putLikeById);
router.delete('/:cardId/likes', reqValidation.likes, deleteLikeById);

module.exports = router;

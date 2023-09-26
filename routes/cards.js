const router = require('express').Router();
const { createCard, getCards, deleteCardById, putLike, deleteLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);

router.patch('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
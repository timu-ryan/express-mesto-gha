const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const {
  NotFoundError,
} = require('../errors/not-found-err');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
// router.use('/*', (req, res) => res.status(NOT_FOUND_ERROR_CODE)
// .send({ message: 'Запрашиваемая страница не найдена' }));
router.use('/*', () => {
  throw new NotFoundError('Нет пользователя с таким id');
});

module.exports = router;

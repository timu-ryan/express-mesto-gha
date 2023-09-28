const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const {
  NOT_FOUND_ERROR_CODE,
} = require('../error-codes/errror-codes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая страница не найдена' }));

module.exports = router;

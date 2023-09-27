const router = require('express').Router();
const {
  createUser, getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

const NOT_FOUND_ERROR_CODE = 404;

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

router.use('/*', (req, res) => res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая страница не найдена' }));

module.exports = router;

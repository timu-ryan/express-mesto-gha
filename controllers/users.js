const User = require('../models/User');

const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const INCORRECT_DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const SERVER_ERROR_CODE = 500;

const createUser = (req, res) => {
  const newUserData = req.body;

  return User.create(newUserData)
    .then((newUser) => res.status(CREATED_CODE).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({
          message: `${Object.values(err.errors).map((e) => e.message).join(', ')}`,
        });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(SUCCESS_CODE).send(users));

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

module.exports = {
  createUser, getUsers, getUserById, updateProfile, updateAvatar,
};

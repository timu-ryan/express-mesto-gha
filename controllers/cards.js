const Card = require('../models/Card');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../error-codes/errror-codes');

const createCard = (req, res) => {
  const newCardData = req.body;
  newCardData.owner = req.user._id;
  return Card.create(newCardData)
    .then((newCard) => res.status(CREATED_CODE).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({
          message: `${Object.values(err.errors).map((e) => e.message).join(', ')}`,
        });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(SUCCESS_CODE).send(cards))
  .catch((err) => res.status(SERVER_ERROR_CODE).send(err));

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  return Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Card not found' });
      }
      return res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
    });
};

const putLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Card not found' });
    }
    return res.status(SUCCESS_CODE).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
  });

const deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Card not found' });
    }
    return res.status(SUCCESS_CODE).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'invalid data' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Server Error' });
  });

module.exports = {
  createCard, getCards, deleteCardById, putLike, deleteLike,
};

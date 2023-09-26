const Card = require("../models/Card");

const createCard = (req, res) => {
  const newCardData = req.body;
  newCardData.owner = req.user._id;
  return Card.create(newCardData)
    .then((newCard) => {
      return res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors).map((err) => err.message).join(", ")}`
        });
      }
      return res.status(500).send({message: "Server Error"});
    })
};

const getCards = (req, res) => {
  return Card.find({})
    .then((cards) => {
      return res.status(200).send(cards);
    })
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  return Card.deleteOne({ _id: cardId})
    .then((user) => {
      if (!user) {
       return res.status(404).send({message: "User not found"});
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      return res.status(500).send({message: "Server Error"});
    })
};


module.exports = { createCard, getCards, deleteCardById };
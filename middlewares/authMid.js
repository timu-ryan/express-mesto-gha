// temporary solution
const authMiddleware = (req, res, next) => {
  // в каждый запрос добавляет объект user
  req.user = {
    _id: '6512ef92200a52e4fe02b912'
  };
  next();
}

module.exports = { authMiddleware };

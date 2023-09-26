const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
// const { authMiddleware } = require('./middlewares/authMid');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
}).then(()=> {
    console.log('connected to db');
});

const authMiddleware = (req, res, next) => {
  // в каждый запрос добавляет объект user
  req.user = {
    _id: '6512ef92200a52e4fe02b912'
  };
  next();
}

const app = express();
app.use(express.json())
app.use(authMiddleware);
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
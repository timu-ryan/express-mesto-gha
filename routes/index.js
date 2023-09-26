const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

// respond with "hello world" when a GET request is made to the homepage
// router.get('/', (req, res) => {
//     res.send('hello world!');
// })

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
// router.use('/profiles', userRoutes);


// router.use(cardRoutes);

//6512ef92200a52e4fe02b912

module.exports = router;

const router = require('express').Router();
const thoughtRoutes = require('./api/thought-routes');
const userRoutes = require('./api/user-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();
const authRouter = require('./auth');

router.use('/auth', authRouter);

model.exports = router;
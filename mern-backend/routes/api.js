// routes/api.js
const express = require('express');
const transactionsRoutes = require('./transactions');
const router = express.Router();

router.use('/transactions', transactionsRoutes);

module.exports = router;

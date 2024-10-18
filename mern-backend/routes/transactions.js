// routes/transactions.js
const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');
const router = express.Router();

// API to seed the database
router.get('/seed-database', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.deleteMany({}); // Clear the existing data
    await Transaction.insertMany(data); // Insert the new data

    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error seeding database');
  }
});

// API to list all transactions with pagination and search
router.get('/transactions', async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;

  const query = search ? {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ],
  } : {};

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  const count = await Transaction.countDocuments(query);

  res.status(200).json({ transactions, totalPages: Math.ceil(count / perPage) });
});

module.exports = router;

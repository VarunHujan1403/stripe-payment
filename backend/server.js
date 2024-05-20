const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('sk_test_51PHSs2SCYZ0If31BLfi4ZsuCNemZkXSc0cOkRB6sdP1XdALz9JJQWOQ8uDTu0xjxiUMLzgGvXvxignSlNXZcmupu00cG74pKRO');
app.use(express.json());
app.use(cors());
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await stripe.charges.list({ limit: 10 });
    res.json(transactions.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { name, amount, transactionID } = req.body;
    console.log('Received transaction data:', { name, amount, transactionID });
    res.status(200).json({ message: 'Transaction successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing transaction' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

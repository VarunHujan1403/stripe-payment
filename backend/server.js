const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('sk_test_51PHSs2SCYZ0If31BLfi4ZsuCNemZkXSc0cOkRB6sdP1XdALz9JJQWOQ8uDTu0xjxiUMLzgGvXvxignSlNXZcmupu00cG74pKRO');
app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { name, amount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Coffee',
          },
          unit_amount: 1000, // Amount is in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/viewtransaction/',
      cancel_url: 'http://localhost:3000/',
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating Checkout session' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

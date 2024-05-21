// PaymentPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

const PaymentPage = ({ onTransactionSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomString = generateRandomString();
    onTransactionSubmit(name, amount, randomString);
    setName('');
    setAmount('');
  };

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post('http://localhost:5000/api/create-checkout-session', {
        name,
        amount
      });
      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId
      });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error.response.data.error);
    }
  };

  const stripePromise = loadStripe('pk_test_51PHSs2SCYZ0If31BnY1wMhBKNOBfSLMgV6oTOX5f8WAhEgc6wanPznDLF7MgrnSntkXW37nUCjUfn3TVV2e2s2kN00bbOsLmC7');

  return (
    <div className="payment-page">
      <h1>Make a Payment</h1>
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} /><br></br>
          <button type="submit" className='pay-btn1'>Click here to save transaction</button>
        </form>
        <button onClick={handlePayment} className="pay-btn">Press here to Pay Now</button>
        <h1>Scroll Down for Transaction History &darr;</h1>
      </div>
    </div>
  );
};

export default PaymentPage;

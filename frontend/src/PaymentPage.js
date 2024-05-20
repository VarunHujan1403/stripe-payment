import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import './App.css';

const PaymentPage = ({ onTransactionSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    createBlinkingLights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomString = generateRandomString();
    onTransactionSubmit(name, amount, randomString);
    setName('');
    setAmount('');
  };

  const handleToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        name,
        amount,
        transactionID: token.id
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data.error);
    }
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

  const createBlinkingLights = () => {
    const lightsContainer = document.createElement('div');
    lightsContainer.classList.add('blinking-lights');

    const paymentForm = document.querySelector('.payment-form');
    paymentForm.appendChild(lightsContainer);
  };

  return (
    <div className="payment-page">
      <h1>Make a Payment</h1>
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} /><br></br>
          <button type="submit" className='pay-btn1'>Click here to save transaction</button>
        </form>
        <StripeCheckout token={handleToken} stripeKey="pk_test_51PHSs2SCYZ0If31BnY1wMhBKNOBfSLMgV6oTOX5f8WAhEgc6wanPznDLF7MgrnSntkXW37nUCjUfn3TVV2e2s2kN00bbOsLmC7" amount={Number(amount) * 100} currency="USD" > <button className="pay-btn">Press here to Pay Now</button> </StripeCheckout>
        <h1>Scroll Down for Transaction History &darr;</h1>
      </div>
    </div>
  );
};

export default PaymentPage;

import React, { useState } from 'react';
import PaymentPage from './PaymentPage';
import ViewTransactions from './ViewTransactions';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const handleTransactionSubmit = (name, amount, randomString) => {
    setTransactions([...transactions, { name, amount, randomString }]);
  };

  return (
    <div className="app">
      <PaymentPage onTransactionSubmit={handleTransactionSubmit} />
      <ViewTransactions transactions={transactions} />
    </div>
  );
};

export default App;

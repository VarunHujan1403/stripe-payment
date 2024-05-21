import React from 'react';
const ViewTransactions = ({ transactions }) => {
  return (
    <div className="view-transactions">
      <h1>Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount ($)</th>
            <th>Transaction ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.randomString}</td>
              <td>Successful</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewTransactions;

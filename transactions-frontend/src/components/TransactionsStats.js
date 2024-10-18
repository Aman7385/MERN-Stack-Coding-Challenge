import React from 'react';

const TransactionsStats = ({ statistics }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale: ${statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStats;

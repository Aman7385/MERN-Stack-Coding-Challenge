import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStats from './components/TransactionsStats';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [month, setMonth] = useState('March');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async () => {
    const response = await axios.get(`/api/transactions`, {
      params: { month, page },
    });
    setTransactions(response.data.transactions);
    setTotalPages(response.data.totalPages);
  };

  const fetchCombinedData = async () => {
    const response = await axios.get(`/api/combined-data`, {
      params: { month },
    });
    setStatistics(response.data.statistics);
    setBarChartData(response.data.barChart);
    setPieChartData(response.data.pieChart);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCombinedData();
  }, [month, page]);

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
      </select>
      <TransactionsTable
        transactions={transactions}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
      <TransactionsStats statistics={statistics} />
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { getSummary, getTransactions, createTransaction, deleteTransaction } from './services/api';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

function App() {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const summaryRes = await getSummary();
      const txRes = await getTransactions();
      setSummary(summaryRes.data);
      setTransactions(txRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (data) => {
    try {
      await createTransaction(data);
      fetchData();
    } catch (err) {
      console.error('Failed to create transaction', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete transaction', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading FinanceManager...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FinanceManager</h1>
      </header>
      
      <main className="app-main">
        <Dashboard summary={summary} transactions={transactions} />
        
        <div className="content-grid">
          <section className="form-section">
            <h2>Add Transaction</h2>
            <TransactionForm onSubmit={handleAddTransaction} />
          </section>
          
          <section className="list-section">
            <h2>Recent Transactions</h2>
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction} 
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

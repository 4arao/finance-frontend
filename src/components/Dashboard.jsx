import React from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = ({ summary, transactions }) => {
  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Total ($)',
        data: [summary.income, summary.expense],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Income color
          'rgba(239, 68, 68, 0.8)',  // Expense color
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Income vs Expenses Overview',
        color: '#94a3b8',
        font: { size: 16, family: 'Inter' }
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-summary">
        <div className="card summary-card income">
          <h3>Total Income</h3>
          <p>${(summary.income || 0).toFixed(2)}</p>
        </div>
        <div className="card summary-card expense">
          <h3>Total Expenses</h3>
          <p>${(summary.expense || 0).toFixed(2)}</p>
        </div>
        <div className="card summary-card">
          <h3>Current Balance</h3>
          <p style={{ color: (summary.balance || 0) >= 0 ? 'var(--income-color)' : 'var(--expense-color)' }}>
            ${(summary.balance || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="card dashboard-charts">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;

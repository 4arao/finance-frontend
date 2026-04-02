import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="card">
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="transactions-container">
      {transactions.map((tx) => (
        <div key={tx.id} className="card transaction-item">
          <div className="tx-info">
            <h4>{tx.title}</h4>
            <p>{tx.category} • {tx.date}</p>
          </div>
          <div className="tx-amount-group">
            <span className={`tx-amount ${tx.type}`}>
              {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
            </span>
            <button 
              className="btn-delete" 
              onClick={() => onDelete(tx.id)}
              title="Delete transaction"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;

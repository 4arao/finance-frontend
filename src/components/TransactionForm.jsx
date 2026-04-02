import React, { useState } from 'react';

const CATEGORIES = [
  'Food & Dining', 'Transportation', 'Salary', 'Bills & Utilities', 
  'Entertainment', 'Shopping', 'Healthcare', 'Other'
];

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    // Reset form for next entry
    setFormData(prev => ({
      ...prev,
      title: '',
      amount: '',
    }));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="E.g., Grocery shopping"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;

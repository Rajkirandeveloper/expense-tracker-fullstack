import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../../src/config"

const Expense = () => {
  // State to manage expenses
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);  // To track the expense being edited
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    date: ''
  });


  const token2 = sessionStorage.getItem('token');
 
 
  // Fetch expenses on page load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3356/api/expense', {
            headers: {
              Authorization: `Bearer ${token2}`
            }
          });
          
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  // Handle input change in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for adding or editing an expense
  const handleSubmit = async (e) => {
    e.preventDefault();

   
      // Adding a new expense
      try {
        if (editingExpense) {
            // Editing an existing expense
            try {
              const response = await axios.patch(`${API_BASE_URL}expense/${editingExpense._id}`, formData);
              setExpenses((prevExpenses) =>
                prevExpenses.map((expense) =>
                  expense._id === editingExpense._id ? response.data : expense
                )
              );
              setEditingExpense(null);  
              setFormData({ title: '', amount: '', date: '' });  
            } catch (error) {
              console.error('Error updating expense:', error);
            }
          } 
       
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  

  // Set expense data for editing
  const handleEdit = (expense) => {
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category:expense.category,
      date: expense.date,
    });
    setEditingExpense(expense);
  };

  // Delete expense
  const handleDelete = async (id) => {
    console.log("CALLED",id)
    try {
      await axios.delete(`${API_BASE_URL}expense/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
      
      {
        editingExpense && 
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button type="submit"> Update Expense </button>
      </form>
      }

     

      <h3>Expenses List</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;



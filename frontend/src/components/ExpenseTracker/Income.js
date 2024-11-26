import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../../src/config"


const Income = () => {
  // State to manage expenses
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);  // To track the expense being edited
  const [formData, setFormData] = useState({
   month: ""
  });

  const token2 = sessionStorage.getItem('token');
 
 
  // Fetch expenses on page load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}income`, {
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
              const response = await axios.patch(`${API_BASE_URL}income/lock`, formData, {
                headers: {
                  Authorization: `Bearer ${token2}`  // Pass the token in the Authorization header
                }
              });
              setExpenses((prevExpenses) =>
                prevExpenses.map((expense) =>
                  expense._id === editingExpense._id ? response.data : expense
                )
              );
              setEditingExpense(null);  
              setFormData({  month: '',  });  
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
     month:expense.month
    });
    setEditingExpense(expense);
  };

 

  return (
    <div>
      
      {
        editingExpense && 
        <form onSubmit={handleSubmit}>
       
        <input
          type="text"
          name="month"
          value={formData.month}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
      
        
        <button type="submit"> Lock Expense </button>
      </form>
      }

     

      <h3>Income List</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Locked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.month}</td>
              <td>${expense.amount}</td>
              <td>{expense.locked}</td>
              <td>
                <button onClick={() => handleEdit(expense)}>Lock</button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Income;



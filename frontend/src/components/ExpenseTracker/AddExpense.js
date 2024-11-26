import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6
import { useAuth } from "../Dashboard/context/AuthContext";
import {API_BASE_URL} from "../../../src/config"
import { Link } from "react-router-dom";

const AddExpense = () => {
  const { user } = useAuth();  // Assuming user context is set up
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}expense`,
        { title, amount, category, date },
        {headers: { Authorization: `Bearer ${localStorage.getItem("newjwt")}` }}
      );
      // Navigate to the dashboard or another page after successful expense addition
      navigate("/"); // Navigate using useNavigate
    } catch (err) {
      setError("Error adding expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-expense">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Add Expense"}
          </button>

         <Link to='/expenses'>Show Expenses</Link> 
        </div>
      </form>
    </div>
  );
};

export default AddExpense;

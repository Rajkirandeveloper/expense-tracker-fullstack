// src/components/AddIncome/AddIncome.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6
import { useAuth } from "../Dashboard/context/AuthContext";
import "./AddIncome.css"
import {API_BASE_URL} from "../../../src/config"
import { Link } from "react-router-dom";

const AddIncome = () => {
  const { user } = useAuth();  // Assuming user context is set up
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
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
        `${API_BASE_URL}income`,
        { amount, month },
        {headers: { Authorization: `Bearer ${localStorage.getItem("newjwt")}` }}
      );
      // Navigate to the dashboard or another page after successful income addition
      navigate("/"); // Use navigate to go to the dashboard
    } catch (err) {
      setError("Error adding income. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-income">
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="month">Month:</label>
          <input  id="month"   name="month"  value={month}  onChange={(e) => setMonth(e.target.value)}  required />
         
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Add Income"}
          </button>
          <Link to='/incomes'>Show Incomes</Link> 
        </div>
      </form>
    </div>
  );
};

export default AddIncome;

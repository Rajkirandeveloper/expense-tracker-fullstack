import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Dashboard/context/AuthContext";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./Dashboard.css"
import {API_BASE_URL} from "../../config"

console.log("API_BASE_URL",API_BASE_URL)
const Dashboard = () => {
  const { user,setUser } = useAuth();  
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  const token2 = sessionStorage.getItem('token');
  console.log(token2,"session");  // It will log the value of 'newjwt' or null if it doesn't exist.
  

  const fetchData = async () => {
    try {
      const incomeResponse = await axios.get(`${API_BASE_URL}income`, {headers: { Authorization: `Bearer ${token2}` }
         });
      const expenseResponse = await axios.get( `${API_BASE_URL}expense`,{headers: { Authorization: `Bearer ${token2}` }
    });

      setIncome(incomeResponse.data);
      setExpenses(expenseResponse.data);
      calculateTotals(incomeResponse.data, expenseResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (incomeData, expenseData) => {
    const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);

    const categoryData = expenseData.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);
    setCategories(categoryData);
  };

  const getSavings = () => {
    return totalIncome - totalExpenses;
  };


  const incomeChartData = {
    labels: income.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Income",
        data: income.map((item) => item.amount),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  const expenseChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expense by Category",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, <span style={{color:"yellow"}}>{user.username}</span> </h2>

      <div className="summary">
        <div>
          <h3>Total Income</h3>
          <p>${totalIncome}</p>
        </div>
        <div>
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        <div>
          <h3>Total Savings</h3>
          <p>${getSavings()}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Income Overview</h3>
          <Line data={incomeChartData} />
        </div>
        <div className="chart">
          <h3>Expense Overview by Category</h3>
          <Pie data={expenseChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

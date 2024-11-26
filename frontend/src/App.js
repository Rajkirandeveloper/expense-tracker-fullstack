import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./components/Dashboard/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import AddIncome from "./components/ExpenseTracker/AddIncome";
import AddExpense from "./components/ExpenseTracker/AddExpense";
import Expense from "./components/ExpenseTracker/Expense";
import Income from "./components/ExpenseTracker/Income";
import "./App.css";
import { Link } from "react-router-dom";


const ProtectedRoute = ({ component: Component }) => {
  const { loading, user } = useAuth();
  if (loading) return <div>Loading...</div>;

  return user ? <Component /> : <Login />;
};

const App = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  };

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="mobile-container">
            <h1> Expense Tracker </h1>
            <div className="hamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
          <ul className={isMenuOpen ? "open" : ""}>
            <li> <Link to="/">  Dashboard</Link>
            
            </li>
            <li>
            <Link to="/add-income"> AddIncome</Link>
             
            </li>
            <li>
            <Link to="/add-expense">AddExpense</Link>
            
            </li>
            <li>
            <Link to="/expenses">Expenses</Link>
             
            </li>
            {user && (
              <li>
                 <Link to="/login" onClick={handleLogout}>Logout</Link>
               
              </li>
            )}
            {!user && (
              <li>
                 <Link to="/login">Login</Link>
              
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
          <Route
            path="/add-income"
            element={<ProtectedRoute component={AddIncome} />}
          />
          <Route
            path="/add-expense"
            element={<ProtectedRoute component={AddExpense} />}
          />
          <Route
            path="/expenses"
            element={<ProtectedRoute component={Expense} />}
          />
           <Route
            path="/incomes"
            element={<ProtectedRoute component={Income} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

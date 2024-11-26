// src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Example: Register User
export const registerUser = async (data) => {
    const response = await api.post('http://localhost:3356/api/auth/register', data);
    return response.data;
};

// Example: Login User
export const loginUser = async (data) => {
    const response = await api.post('http://localhost:3356/api/auth/login', data);
    return response.data;
};

// Add Income
export const addIncome = async (data) => {
    const response = await api.post('http://localhost:3356/api/income', data);
    return response.data;
};

// Add Expense
export const addExpense = async (data) => {
    const response = await api.post('http://localhost:3356/api/expense', data);
    return response.data;
};

// Get Income and Expenses
export const getIncome = async () => {
    const response = await api.get('/income');
    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get('/expense');
    return response.data;
};

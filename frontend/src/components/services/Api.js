// src/services/api.js

import axios from 'axios';
import {API_BASE_URL} from "../../config"

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Example: Register User
export const registerUser = async (data) => {
    const response = await api.post(`${API_BASE_URL}auth/register`, data);
    return response.data;
};

// Example: Login User
export const loginUser = async (data) => {
    const response = await api.post(`${API_BASE_URL}auth/login`, data);
    return response.data;
};

// Add Income
export const addIncome = async (data) => {
    const response = await api.post(`${API_BASE_URL}income`, data);
    return response.data;
};

// Add Expense
export const addExpense = async (data) => {
    const response = await api.post(`${API_BASE_URL}expense`, data);
    return response.data;
};

// Get Income and Expenses
export const getIncome = async () => {
    const response = await api.get(`${API_BASE_URL}income`);
    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get(`${API_BASE_URL}expense`);
    return response.data;
};

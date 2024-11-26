// src/components/Dashboard/ExpenseChart.js

import React, { useEffect, useState } from 'react';
import { getExpenses } from '../../components/Dashboard/';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ExpenseChart = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getExpenses();
            setExpenses(data);
        };
        fetchExpenses();
    }, []);

    const chartData = {
        labels: expenses.map(exp => exp.category),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(exp => exp.amount),
            
                backgroundColor: '#FFB3B3',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default ExpenseChart;

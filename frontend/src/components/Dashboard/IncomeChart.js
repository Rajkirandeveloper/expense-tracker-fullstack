// // src/components/Dashboard/IncomeChart.js

// import React, { useEffect, useState } from 'react';
// import { getIncome } from '../../services/Api';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';

// const IncomeChart = () => {
//     const [incomeData, setIncomeData] = useState([]);

//     useEffect(() => {
//         const fetchIncome = async () => {
//             const data = await getIncome();
//             setIncomeData(data);
//         };
//         fetchIncome();
//     }, []);

//     const chartData = {
//         labels: incomeData.map(income => income.month),
//         datasets: [
//             {
//                 data: incomeData.map(income => income.amount),
//                 backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
//             },
//         ],
//     };

//     return <Pie data={chartData} />;
// };

// export default IncomeChart;


import React, { useEffect, useState } from 'react';
import { getIncome } from '../../services/Api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const IncomeChart = () => {
    const [incomeData, setIncomeData] = useState([]);

    // Fetch the income data on component mount
    useEffect(() => {
        const fetchIncome = async () => {
            const data = await getIncome();
            setIncomeData(data);
        };
        fetchIncome();
    }, []);

    // Function to convert month number to month name
    const getMonthName = (monthNumber) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthNumber - 1]; // Adjusting for 0-based index
    };

    // Prepare the chart data with month names
    const chartData = {
        labels: incomeData.map(income => getMonthName(income.month)), // Convert month number to month name
        datasets: [
            {
                data: incomeData.map(income => income.amount),
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C00', '#8A2BE2', '#A52A2A', '#20B2AA'],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default IncomeChart;


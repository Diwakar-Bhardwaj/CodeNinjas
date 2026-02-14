import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = () => {
  // Dummy data for the chart
  const data = {
    labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29', 'Nov 5', 'Nov 12'],
    datasets: [
      {
        label: 'Price (in ₹)',
        data: [1999, 1850, 1900, 1750, 1600, 1550, 999],
        borderColor: '#1D4ED8', // primary color
        backgroundColor: 'rgba(29, 78, 216, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Price History (Last 2 Months)',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line options={options} data={data} />
    </div>
  );
};

export default PriceChart;
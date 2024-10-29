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

// Register necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ historicalData }) {
  // Define chart data using `historicalData`
  const chartData = {
    labels: historicalData.map(data => data.date), // Dates for the x-axis
    datasets: [
      {
        label: 'Stock Price',
        data: historicalData.map(data => data.close), // Prices for the y-axis
        fill: false,
        borderColor: 'rgba(75,192,192,1)', // Line color
        tension: 0.1, // Line tension for a smooth curve
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
  };

  // Render the chart with Line component
  return (
    <div style={{ height: '400px', width: '100%' }}> {/* Adjust the height as needed */}
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;

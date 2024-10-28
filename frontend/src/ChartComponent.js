import React, { useEffect, useRef } from 'react';
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
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup function to destroy the chart before re-rendering
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [historicalData]);

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

  // Render the chart with Line component
  return <Line ref={chartRef} data={chartData} />;
}

export default ChartComponent;

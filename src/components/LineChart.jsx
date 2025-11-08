import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ labels, tempData, humData, fullDates }) => {
  const data = {
    labels,
    datasets: [
      { label: 'Temperature (°C)', data: tempData, borderColor: 'red', tension: 0.3 },
      { label: 'Humidity (%)', data: humData, borderColor: 'blue', tension: 0.3 }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function(context) {
            const index = context[0].dataIndex;
            return fullDates[index] || context[0].label;
          }
        }
      }
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Value' } }
    }
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

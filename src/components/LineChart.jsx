import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ labels, tempData, humData, selectedSensors = [], fullDates }) => {
  const datasets = [];

  // Add Temperature dataset if selected
  if (selectedSensors.includes('Temperature')) {
    datasets.push({
      label: 'Temperature (°C)',
      data: tempData,
      borderColor: '#F9CF93', // warm orange
      backgroundColor: 'rgba(249, 207, 147, 0.3)',
      tension: 0.3,
      pointRadius: 3
    });
  }

  // Add Humidity dataset if selected
  if (selectedSensors.includes('Humidity')) {
    datasets.push({
      label: 'Humidity (%)',
      data: humData,
      borderColor: '#F9E4C8', // soft beige
      backgroundColor: 'rgba(249, 228, 200, 0.3)',
      tension: 0.3,
      pointRadius: 3
    });
  }

  if (selectedSensors.includes('Light')) {
  datasets.push({
    label: 'Light (lx)',
    data: lightData,
    borderColor: '#FAEEE0', // cream
    backgroundColor: 'rgba(250, 238, 224, 0.3)',
    tension: 0.3,
    pointRadius: 3
  });
}

if (selectedSensors.includes('Pressure')) {
  datasets.push({
    label: 'Pressure (hPa)',
    data: pressureData,
    borderColor: '#DBD0C0', // beige
    backgroundColor: 'rgba(219, 208, 192, 0.3)',
    tension: 0.3,
    pointRadius: 3
  });
}


  const data = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#4a351f' // legend text color
        }
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            const index = context[0].dataIndex;
            return fullDates[index] || context[0].label;
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Time', color: '#4a351f' },
        ticks: { color: '#4a351f' },
        grid: { color: '#ccc' }
      },
      y: {
        title: { display: true, text: 'Value', color: '#4a351f' },
        ticks: { color: '#4a351f' },
        grid: { color: '#ccc' }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

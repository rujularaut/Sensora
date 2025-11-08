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

const LineChart = ({ labels, tempData, humData, lightData, pressureData, selectedSensors = [], fullDates }) => {
  const datasets = [];

  if (selectedSensors.includes('Temperature')) {
    datasets.push({
      label: 'Temperature (°C)',
      data: tempData,
      borderColor: '#F9CF93',
      backgroundColor: 'rgba(249, 207, 147, 0.3)',
      tension: 0.3,
      pointRadius: 3,
      yAxisID: 'yTemp',
    });
  }

  if (selectedSensors.includes('Humidity')) {
    datasets.push({
      label: 'Humidity (%)',
      data: humData,
      borderColor: '#F9E4C8',
      backgroundColor: 'rgba(249, 228, 200, 0.3)',
      tension: 0.3,
      pointRadius: 3,
      yAxisID: 'yHum',
    });
  }

  if (selectedSensors.includes('Light')) {
    datasets.push({
      label: 'Light (lx)',
      data: lightData,
      borderColor: '#FAEEE0',
      backgroundColor: 'rgba(250, 238, 224, 0.3)',
      tension: 0.3,
      pointRadius: 3,
      yAxisID: 'yLight',
    });
  }

  if (selectedSensors.includes('Pressure')) {
    datasets.push({
      label: 'Pressure (hPa)',
      data: pressureData,
      borderColor: '#DBD0C0',
      backgroundColor: 'rgba(219, 208, 192, 0.3)',
      tension: 0.3,
      pointRadius: 3,
      yAxisID: 'yPressure',
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
        labels: { color: '#4a351f' }
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            return fullDates[index] || context[0].label;
          },
          label: function (context) {
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
  yTemp: {
    type: 'linear',
    position: 'left',
    display: selectedSensors.includes('Temperature'),
    title: { display: true, text: 'Temperature (°C)' },
    ticks: { color: '#F9CF93', padding: 0 },
    grid: { drawOnChartArea: true },
    offset: true
  },
  yHum: {
    type: 'linear',
    position: 'left',
    display: selectedSensors.includes('Humidity'),
    title: { display: true, text: 'Humidity (%)' },
    ticks: { color: '#F9E4C8', padding: 40 }, // offset labels so they don’t overlap
    grid: { drawOnChartArea: false },
    offset: true
  },
  yLight: {
    type: 'linear',
    position: 'left',
    display: selectedSensors.includes('Light'),
    title: { display: true, text: 'Light (lx)' },
    ticks: { color: '#FAEEE0', padding: 80 },
    grid: { drawOnChartArea: false },
    offset: true
  },
  yPressure: {
    type: 'linear',
    position: 'left',
    display: selectedSensors.includes('Pressure'),
    title: { display: true, text: 'Pressure (hPa)' },
    ticks: { color: '#DBD0C0', padding: 120 },
    grid: { drawOnChartArea: false },
    offset: true
  }
}

  };

  return <Line data={data} options={options} />;
};

export default LineChart;

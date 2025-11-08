import React, { useState, useEffect } from 'react';
import SensorCard from './components/SensorCard.jsx';
import LineChart from './components/LineChart.jsx';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [temp, setTemp] = useState('— °C');
  const [hum, setHum] = useState('— %');
  const [lastUpdate, setLastUpdate] = useState('—');
  const [labels, setLabels] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humData, setHumData] = useState([]);
  const [fullDates, setFullDates] = useState([]);
  const [status, setStatus] = useState('connected');

  function formatDateLocal(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2,'0');
    const month = String(d.getMonth()+1).padStart(2,'0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2,'0');
    const mins = String(d.getMinutes()).padStart(2,'0');
    const secs = String(d.getSeconds()).padStart(2,'0');
    return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
  }

  function generateData() {
    const now = new Date();
    const tempVal = (20 + Math.random() * 10).toFixed(1);
    const humVal = (40 + Math.random() * 20).toFixed(1);
    return { tempVal, humVal, timestamp: now };
  }

  useEffect(() => {
    if (!loggedIn) return;

    const interval = setInterval(() => {
      const { tempVal, humVal, timestamp } = generateData();
      const timeStr = timestamp.toTimeString().split(' ')[0];
      setTemp(tempVal + ' °C');
      setHum(humVal + ' %');
      setLastUpdate(formatDateLocal(timestamp));

      setLabels(prev => [...prev.slice(-99), timeStr]);
      setTempData(prev => [...prev.slice(-99), tempVal]);
      setHumData(prev => [...prev.slice(-99), humVal]);
      setFullDates(prev => [...prev.slice(-99), formatDateLocal(timestamp)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [loggedIn]);

  // Login form submit
  function handleLogin(e) {
    e.preventDefault();
    if (username.trim() !== '') setLoggedIn(true);
  }

  // ---------- Conditional Render ----------
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h2>Welcome to Tiny Thingspeak</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Dashboard after login ----------
  return (
    <div className="dashboard">
      <header>
        <h2>Tiny Thingspeak — Live</h2>
        <div className="user-info">
          Welcome, <strong>{username}</strong> | Status: <span className={`status ${status}`}>{status}</span>
        </div>
      </header>

      <div className="cards">
        <SensorCard title="Temperature" value={temp} />
        <SensorCard title="Humidity" value={hum} />
        <SensorCard title="Last Update" value={lastUpdate} />
      </div>

      <div className="chart-container">
        <LineChart labels={labels} tempData={tempData} humData={humData} fullDates={fullDates} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import SensorCard from './components/SensorCard.jsx';
import LineChart from './components/LineChart.jsx';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For display after login

  const [temp, setTemp] = useState('— °C');
  const [hum, setHum] = useState('— %');
  const [lastUpdate, setLastUpdate] = useState('—');
  const [labels, setLabels] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humData, setHumData] = useState([]);
  const [fullDates, setFullDates] = useState([]);
  const [status, setStatus] = useState('connected');

  // Format timestamp
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

  // Simulate sensor data
  function generateData() {
    const now = new Date();
    const tempVal = (20 + Math.random() * 10).toFixed(1);
    const humVal = (40 + Math.random() * 20).toFixed(1);
    return { tempVal, humVal, timestamp: now };
  }

  // Update sensor data every 3 seconds
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

  // Handle login submit
  function handleLogin(e) {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      setUsername(email.split('@')[0]); // Simple username display
      setLoggedIn(true);
    } else {
      alert("Please enter email and password");
    }
  }

  // Handle Google login (mock)
  function handleGoogleLogin() {
    const mockUsername = "GoogleUser";
    setUsername(mockUsername);
    setLoggedIn(true);
  }

  // ---------------- Render Login Page ----------------
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h2>Sensera</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email ID" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <div className="divider">or</div>

          <button className="google-btn" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>

          <div className="signup-link">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Render Dashboard ----------------
  return (
    <div className="dashboard">
      <header>
        <h2>Sensera — Live Dashboard</h2>
        <div>Welcome, {username} | Status: <span>{status}</span></div>
      </header>

      <div className="cards">
        <SensorCard title="Temperature" value={temp} />
        <SensorCard title="Humidity" value={hum} />
        <SensorCard title="Last Update" value={lastUpdate} />
      </div>

      <div className="chart-container">
        <LineChart 
          labels={labels} 
          tempData={tempData} 
          humData={humData} 
          fullDates={fullDates} 
        />
      </div>
    </div>
  );
}

export default App;

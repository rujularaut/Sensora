import React, { useState, useEffect } from 'react';
import SensorCard from './components/SensorCard.jsx';
import LineChart from './components/LineChart.jsx';
import WelcomeDashboard from './components/WelcomeDashboard.jsx';
import './App.css';

function App() {
  const [page, setPage] = useState('login'); // 'login' | 'welcome' | 'dashboard'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedSensors, setSelectedSensors] = useState([]); // array of strings e.g. ['Temperature']
  const [temp, setTemp] = useState('— °C');
  const [hum, setHum] = useState('— %');
  const [lastUpdate, setLastUpdate] = useState('—');
  const [labels, setLabels] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humData, setHumData] = useState([]);
  const [fullDates, setFullDates] = useState([]);
  const [status, setStatus] = useState('connected');
  const [light, setLight] = useState('— lx');
  const [pressure, setPressure] = useState('— hPa');
  const [lightData, setLightData] = useState([]);
  const [pressureData, setPressureData] = useState([]);


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
  const lightVal = (200 + Math.random() * 800).toFixed(0); // example lx
  const pressureVal = (980 + Math.random() * 40).toFixed(1); // example hPa
  return { tempVal, humVal, lightVal, pressureVal, timestamp: now };
}


  // Update live sensor data every 3s
  useEffect(() => {
    if (page !== 'dashboard') return;

    const interval = setInterval(() => {
      const { tempVal, humVal, timestamp } = generateData();
      const timeStr = timestamp.toTimeString().split(' ')[0];

      setTemp(tempVal + ' °C');
      setHum(humVal + ' %');
      setLastUpdate(formatDateLocal(timestamp));

      setLabels(prev => [...prev.slice(-99), timeStr]);
      setTempData(prev => [...prev.slice(-99), tempVal]);
      setHumData(prev => [...prev.slice(-99), humVal]);
      setLight(lightVal + ' lx');
      setPressure(pressureVal + ' hPa');
      setLightData(prev => [...prev.slice(-99), lightVal]);
      setPressureData(prev => [...prev.slice(-99), pressureVal]);

      setFullDates(prev => [...prev.slice(-99), formatDateLocal(timestamp)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [page]);

  // Login submit
  function handleLogin(e) {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      setUsername(email.split('@')[0]);
      setPage('welcome');
    } else {
      alert("Please enter email and password");
    }
  }

  // Google login (mock)
  function handleGoogleLogin() {
    const mockUsername = "GoogleUser";
    setUsername(mockUsername);
    setPage('welcome');
  }

  // Handle sensors selected from WelcomeDashboard
  function goToDashboard(selected) {
    if (!selected || selected.length === 0) {
      alert("Please select at least one sensor");
      return;
    }
    // store only sensor names (strings)
    const sensorNames = selected.map(s => s.name);
    setSelectedSensors(sensorNames);
    setPage('dashboard');
  }

  // ---------- Renders ----------
  if (page === 'login') {
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

  if (page === 'welcome') {
    return (
      <WelcomeDashboard
        username={username}
        goToDashboard={goToDashboard}
      />
    );
  }

  // Dashboard render
  return (
    <div className="dashboard">
      <header>
        <h2>Sensera — Live Dashboard</h2>
        <div>Welcome, {username} | Status: <span>{status}</span></div>
      </header>

      <div className="cards">
        {selectedSensors.includes('Temperature') && <SensorCard title="Temperature" value={temp} />}
        {selectedSensors.includes('Humidity') && <SensorCard title="Humidity" value={hum} />}
        {selectedSensors.includes('Last Update') && <SensorCard title="Last Update" value={lastUpdate} />}
        {selectedSensors.includes('Light') && <SensorCard title="Light" value="—" />}
        {selectedSensors.includes('Pressure') && <SensorCard title="Pressure" value="—" />}
      </div>

      <div className="chart-container">
        <LineChart
          labels={labels}
          tempData={selectedSensors.includes('Temperature') ? tempData : []}
          humData={selectedSensors.includes('Humidity') ? humData : []}
          selectedSensors={selectedSensors}
          fullDates={fullDates}
        />
      </div>
    </div>
  );
}

export default App;

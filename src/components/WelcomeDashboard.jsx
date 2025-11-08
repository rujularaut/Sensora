import React, { useState } from 'react';
import SensorCard from './SensorCard.jsx';

const WelcomeDashboard = ({ username, goToDashboard }) => {
  // List of available sensors with unique colors
  const availableSensors = [
    { name: 'Temperature', color: '#F9CF93', active: false }, // orange/yellow
    { name: 'Humidity', color: '#F9E4C8', active: false },    // light peach
    { name: 'Light', color: '#FAEEE0', active: false },       // cream
    { name: 'Pressure', color: '#DBD0C0', active: false },    // beige
  ];

  const [sensors, setSensors] = useState(availableSensors);

  // Toggle sensor selection
  const toggleSensor = (index) => {
    const updated = [...sensors];
    updated[index].active = !updated[index].active;
    setSensors(updated);
  };

  // Filter selected sensors
  const selectedSensors = sensors.filter(s => s.active);

  return (
    <div className="welcome-page">
      <h2>Welcome, {username}!</h2>
      <p>Select the sensors you want to monitor:</p>

      <div className="sensor-selection">
        {sensors.map((s, idx) => (
          <div
            key={idx}
            className={`sensor-card selectable ${s.active ? 'active' : ''}`}
            style={{ backgroundColor: s.color }}
            onClick={() => toggleSensor(idx)}
          >
            <h3>{s.name}</h3>
            {s.active && <p>Selected</p>}
          </div>
        ))}
      </div>

      {selectedSensors.length > 0 && (
        <div className="selected-sensors-preview">
          <p>Selected sensors preview:</p>
          <div className="cards">
            {selectedSensors.map((s, idx) => (
              <SensorCard key={idx} title={s.name} value="—" />
            ))}
          </div>
        </div>
      )}

      <button
        className="go-dashboard-btn"
        disabled={selectedSensors.length === 0}
        onClick={() => goToDashboard(selectedSensors)}
      >
        Go to Live Dashboard
      </button>
    </div>
  );
};

export default WelcomeDashboard;

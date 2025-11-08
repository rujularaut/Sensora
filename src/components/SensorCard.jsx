import React from 'react';
import '../App.css';

const SensorCard = ({ title, value }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default SensorCard;

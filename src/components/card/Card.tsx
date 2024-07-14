import React from 'react';
import './Card.css';

export const Card: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
    </div>
  );
};


import React from 'react';
import './Card.css';

export const Card: ({ name, description }: { name: any; description: any }) => React.JSX.Element = ({ name, description }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
    </div>
  );
};

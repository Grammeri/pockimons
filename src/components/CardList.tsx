import React from 'react';
import { Card } from './Card';
import { CardListProps } from '../types.ts';



export const CardList: React.FC<CardListProps> = ({ cards }) => {
  if (cards.length === 0) {
    return <p>No cards available</p>;
  }

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card key={index} name={card.name} description={card.description} />
      ))}
    </div>
  );
};

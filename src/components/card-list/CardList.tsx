import React from 'react';
import { CardListProps } from '../../types';
import { Card } from '../card/Card';
import './CardList.css';

export const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
  if (cards.length === 0) {
    return <p>No cards available</p>;
  }

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <div key={index} onClick={() => onCardClick(card)}>
          <Card name={card.name} />
        </div>
      ))}
    </div>
  );
};

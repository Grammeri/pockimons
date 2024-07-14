import React, { useState, useEffect } from 'react';
import { CardItem } from '../../types';
import './DetailedCard.css';

interface DetailedCardProps {
  card: CardItem;
  onClose: () => void;
}

export const DetailedCard: React.FC<DetailedCardProps> = ({ card, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (card) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${card.name.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            setImageUrl(data.sprites.front_default);
            setLoading(false);
          }, 500);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          setLoading(false);
        });
    }
  }, [card]);

  return (
    <div className="detailed-card">
      <button onClick={onClose}>Close</button>
      <h2>{card.name}</h2>
      <p>{card.description}</p>
      {loading ? <p>Loading...</p> : <img src={imageUrl || ''} alt={card.name} />}
    </div>
  );
};

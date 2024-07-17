// src/components/detailed-card/DetailedCard.tsx
import React from 'react';
import { CardItem } from '../../types';
import { useGetPokemonByNameQuery } from '../../services/pokemon';
import './DetailedCard.css';

interface DetailedCardProps {
    card: CardItem;
    onClose: () => void;
}

export const DetailedCard: React.FC<DetailedCardProps> = ({ card, onClose }) => {
    const { data, error, isLoading } = useGetPokemonByNameQuery(card.name.toLowerCase());

    return (
        <div className="detailed-card">
            <button onClick={onClose}>Close</button>
            <h2>{card.name}</h2>
            <p>{card.description}</p>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading image</p>
            ) : (
                <img src={data?.sprites.front_default || ''} alt={card.name} />
            )}
        </div>
    );
};

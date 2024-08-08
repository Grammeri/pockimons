import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardItem } from '../../types';
import { addItem, removeItem, clearItems } from '../../slices/selectedItemsSlice';
import { RootState } from '../../store';
import styles from './CardList.module.css';

interface CardListProps {
  cards: CardItem[];
  onCardClick: (card: CardItem) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (card: CardItem) => {
    if (selectedItems.some(item => item.name === card.name)) {
      dispatch(removeItem(card));
    } else {
      dispatch(addItem(card));
    }
  };

  return (
      <div className={styles.cardList}>
        {cards.map((card) => (
            <div key={card.name} className={styles.card}>
              <label>
                <input
                    type="checkbox"
                    checked={selectedItems.some(item => item.name === card.name)}
                    onChange={() => handleCheckboxChange(card)}
                />
                <span onClick={() => onCardClick(card)} className={styles.cardName}>{card.name}</span>
              </label>
            </div>
        ))}
        <button className={styles.clearButton} onClick={() => dispatch(clearItems())}>Clear All</button>
      </div>
  );
};

import React from 'react';
import styles from './Card.module.css';

export const Card: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
    </div>
  );
};


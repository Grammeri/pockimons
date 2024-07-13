import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../card/Card';

const mockCard = { name: 'Pikachu', description: 'Electric type Pokémon' };

test('renders the relevant card data', () => {
  render(<Card name={mockCard.name} description={mockCard.description} />);
  expect(screen.getByText(mockCard.name)).toBeInTheDocument();
  expect(screen.getByText(mockCard.description)).toBeInTheDocument();
});

test('clicking on a card triggers callback', () => {
  const handleClick = jest.fn();
  render(
    <div onClick={handleClick}>
      <Card name={mockCard.name} description={mockCard.description} />
    </div>
  );

  fireEvent.click(screen.getByText(mockCard.name));
  expect(handleClick).toHaveBeenCalled();
});

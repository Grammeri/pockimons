import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DetailedCard } from '../detailed-card/DetailedCard';
import { CardItem } from '../../types';

// Mock data for the test
const mockCard: CardItem = {
  name: 'Pikachu',
  description: 'Electric type Pokémon',
};

// Mock fetch response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ sprites: { front_default: 'https://example.com/image.png' } }),
  })
) as jest.Mock;

describe('DetailedCard', () => {
  test('displays a loading indicator while fetching data', async () => {
    render(<DetailedCard card={mockCard} onClose={() => {}} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Проверяем, что текст "Loading..." отображается

    await waitFor(() => expect(screen.getByAltText(mockCard.name)).toBeInTheDocument());
  });

  test('correctly displays the detailed card data', async () => {
    render(<DetailedCard card={mockCard} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(mockCard.name)).toBeInTheDocument();
      expect(screen.getByText(mockCard.description)).toBeInTheDocument();
      expect(screen.getByAltText(mockCard.name)).toHaveAttribute('src', 'https://example.com/image.png');
    });
  });

  test('hides component on close button click', () => {
    const handleClose = jest.fn();
    render(<DetailedCard card={mockCard} onClose={handleClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});

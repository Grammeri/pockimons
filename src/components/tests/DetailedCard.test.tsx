import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DetailedCard } from '../detailed-card/DetailedCard';
import { CardItem } from '../../types';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ sprites: { front_default: 'https://example.com/image.png' } }),
  })
) as jest.Mock;

const mockCard: CardItem = { name: 'Pikachu', description: 'Electric type Pokémon' };

test('displays a loading indicator while fetching data', async () => {
  await act(async () => {
    render(<DetailedCard card={mockCard} onClose={() => {}} />);
  });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('correctly displays the detailed card data', async () => {
  await act(async () => {
    render(<DetailedCard card={mockCard} onClose={() => {}} />);
  });

  await waitFor(() => {
    expect(screen.getByAltText(mockCard.name)).toBeInTheDocument();
  });
  expect(screen.getByText(mockCard.name)).toBeInTheDocument();
  expect(screen.getByText(mockCard.description)).toBeInTheDocument();
});

test('clicking the close button hides the component', () => {
  const handleClose = jest.fn();
  render(<DetailedCard card={mockCard} onClose={handleClose} />);
  fireEvent.click(screen.getByText(/close/i));
  expect(handleClose).toHaveBeenCalled();
});

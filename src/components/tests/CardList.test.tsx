import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardList } from '../card-list/CardList';
import { CardItem } from '../../types';

const mockCards: CardItem[] = [
  { name: 'Pikachu', description: 'Electric type Pokémon' },
  { name: 'Bulbasaur', description: 'Grass/Poison type Pokémon' },
];

test('renders the specified number of cards', () => {
  render(<CardList cards={mockCards} onCardClick={() => {}} />);
  const cards = screen.getAllByRole('heading', { level: 3 });
  expect(cards).toHaveLength(mockCards.length);
});

test('displays appropriate message if no cards are present', () => {
  render(<CardList cards={[]} onCardClick={() => {}} />);
  expect(screen.getByText('No cards available')).toBeInTheDocument();
});

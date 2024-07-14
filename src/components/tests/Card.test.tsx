import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../card/Card';

const mockCard = {
  name: 'Pikachu'
};

test('renders the relevant card data', () => {
  render(<Card name={mockCard.name} />);
  expect(screen.getByText(mockCard.name)).toBeInTheDocument();
});

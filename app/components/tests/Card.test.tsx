// src/components/tests/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../card/Card';

describe('Card', () => {
  it('renders the card with the correct name', () => {
    render(<Card name="Pikachu" />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});

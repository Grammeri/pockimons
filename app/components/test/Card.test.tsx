import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../../components/card/Card';

describe('Card', () => {
  it('renders the card with the correct name', () => {
    const name = 'Test Card';
    render(<Card name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

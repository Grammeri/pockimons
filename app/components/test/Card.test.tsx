import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../../components/card/Card';

describe('Card Component', () => {
  it('renders the card with the correct name', () => {
    const testName = 'Test Card Name';

    render(<Card name={testName} />);

    const cardElement = screen.getByText(testName);
    expect(cardElement).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Custom404 from '../../pages/404';
import { vi } from 'vitest';

vi.mock('../../components/not-found/NotFound', () => ({
  NotFound: vi.fn(() => <div>Not Found Component</div>),
}));

describe('Custom404', () => {
  it('renders NotFound component', () => {
    render(<Custom404 />);
    expect(screen.getByText('Not Found Component')).toBeInTheDocument();
  });
});

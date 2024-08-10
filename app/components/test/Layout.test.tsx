import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '../../layout';

const MockChildComponent = () => <div>Mock Child Component</div>;

describe('RootLayout component', () => {
  it('renders children within Provider and ThemeProvider', () => {
    render(
      <RootLayout>
        <MockChildComponent />
      </RootLayout>
    );

    expect(screen.getByText('Mock Child Component')).toBeInTheDocument();
  });

  it('renders the Provider and ThemeProvider correctly', () => {
    render(
      <RootLayout>
        <MockChildComponent />
      </RootLayout>
    );
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import App from '../../pages/index';
import { store } from '../../store';
import { ThemeProvider } from '../../contexts/ThemeContext';

vi.mock('../../hooks/useFetchData', () => ({
  useFetchData: vi.fn(() => ({
    results: [{ name: 'Pikachu', description: 'Electric', sprites: { front_default: '' } }],
    loading: false,
    handleSearch: vi.fn(),
    throwError: vi.fn(),
    currentPage: 1,
    totalPages: 1,
    handlePageChange: vi.fn(),
    fetchData: vi.fn(),
  })),
}));

vi.mock('../../hooks/useSearchTerm', () => ({
  __esModule: true,
  default: vi.fn(() => [['Pikachu'], vi.fn()]),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

describe('App', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          {ui}
        </ThemeProvider>
      </Provider>,
    );
  };

  it('renders search input and buttons', () => {
    renderWithProviders(<App />);

    expect(screen.getByLabelText('Choose theme:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('handles search input change', () => {
    renderWithProviders(<App />);

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(input.value).toBe('Pikachu');
  });

  it('handles theme change', () => {
    renderWithProviders(<App />);

    const themeSelect = screen.getByLabelText('Choose theme:') as HTMLSelectElement;
    fireEvent.change(themeSelect, { target: { value: 'dark' } });

    expect(themeSelect.value).toBe('dark');
  });
});

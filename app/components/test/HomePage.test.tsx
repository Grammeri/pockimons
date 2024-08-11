import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ThemeProvider } from '../../contexts/ThemeContext';
import HomePage from '../../home/HomePage';
import { vi } from 'vitest';

// Мокаем необходимые хуки из Remix
vi.mock('@remix-run/react', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({
    search: '',
  }),
}));

// Мокаем кастомный хук useFetchData
vi.mock('../../app/hooks/useFetchData', () => ({
  useFetchData: () => ({
    results: [],
    loading: true,
    handleSearch: vi.fn(),
    throwError: vi.fn(),
    currentPage: 1,
    totalPages: 1,
    handlePageChange: vi.fn(),
    fetchData: vi.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders loading state correctly', () => {
    render(
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
    );

    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('changes theme when the theme switcher is used', () => {
    render(
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
    );

    const themeSwitcher = screen.getByLabelText(/choose theme/i);
    fireEvent.change(themeSwitcher, { target: { value: 'dark' } });

    const container = screen.getByTestId('home-page-container');
    expect(container.className).toContain('dark');
  });

  it('renders theme switcher label correctly', () => {
    render(
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
    );

    const themeLabel = screen.getByText(/choose theme:/i);
    expect(themeLabel).toBeInTheDocument();
  });
});

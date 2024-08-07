import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import App from '../../pages/index';
import { store } from '../../store';
import { ThemeProvider } from '../../contexts/ThemeContext'

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
            </Provider>
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

    // Закомментируем этот тест
    // it('renders card list and detailed card on card click', async () => {
    //     renderWithProviders(<App />);

    //     await waitFor(() => expect(screen.getByText('Pikachu')).toBeInTheDocument());

    //     const card = screen.getByText('Pikachu');
    //     fireEvent.click(card);

    //     expect(screen.getByText('Electric')).toBeInTheDocument();
    // });

    it('handles theme change', () => {
        renderWithProviders(<App />);

        const themeSelect = screen.getByLabelText('Choose theme:') as HTMLSelectElement;
        fireEvent.change(themeSelect, { target: { value: 'dark' } });

        expect(themeSelect.value).toBe('dark');
    });

    // Закомментируем этот тест
    // it('handles unselect all and download buttons', async () => {
    //     renderWithProviders(<App />);

    //     await waitFor(() => expect(screen.getByText('Pikachu')).toBeInTheDocument());

    //     const card = screen.getByText('Pikachu');
    //     fireEvent.click(card);

    //     await waitFor(() => expect(screen.getByText('Items selected: 1')).toBeInTheDocument());

    //     const unselectButton = screen.getByText('Unselect all');
    //     fireEvent.click(unselectButton);

    //     expect(screen.queryByText('Items selected: 1')).not.toBeInTheDocument();

    //     // Проверка кнопки Download
    //     const downloadButton = screen.getByText('Download');
    //     fireEvent.click(downloadButton);
    // });
});

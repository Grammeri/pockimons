import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { act } from 'react-dom/test-utils';

// Mock the fetchData function and other hooks
jest.mock('../hooks/useFetchData', () => ({
    useFetchData: () => ({
        results: [
            { name: 'bulbasaur', description: 'http://example.com/bulbasaur' },
            { name: 'ivysaur', description: 'http://example.com/ivysaur' },
        ],
        loading: false,
        handleSearch: jest.fn(),
        throwError: jest.fn(),
        currentPage: 1,
        totalPages: 3,
        handlePageChange: jest.fn(),
        fetchData: jest.fn(),
    }),
}));

jest.mock('../hooks/useSearchTerm', () => (key: string) => [
    ['bulbasaur', 'ivysaur'],
    jest.fn(),
]);

describe('App component', () => {
    test('renders App component with Search, CardList, and Pagination', async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText(/Search/)).toBeInTheDocument();
        expect(screen.getByText(/bulbasaur/)).toBeInTheDocument();
        expect(screen.getByText(/ivysaur/)).toBeInTheDocument();
        expect(screen.getByText(/Loading/)).not.toBeInTheDocument();
    });

    test('shows loading indicator when loading', () => {
        // Изменение: добавил повторное мокирование внутри теста, чтобы учесть состояние загрузки
        jest.mock('../hooks/useFetchData', () => ({
            useFetchData: () => ({
                results: [],
                loading: true,
                handleSearch: jest.fn(),
                throwError: jest.fn(),
                currentPage: 1,
                totalPages: 3,
                handlePageChange: jest.fn(),
                fetchData: jest.fn(),
            }),
        }));

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });

    test('searches for a term and updates the list', async () => {
        const { useFetchData } = require('../hooks/useFetchData');
        const mockHandleSearch = jest.fn();
        useFetchData.mockReturnValue({
            results: [],
            loading: false,
            handleSearch: mockHandleSearch,
            throwError: jest.fn(),
            currentPage: 1,
            totalPages: 3,
            handlePageChange: jest.fn(),
            fetchData: jest.fn(),
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'Pikachu' } });
        fireEvent.click(screen.getByText('Search'));

        expect(mockHandleSearch).toHaveBeenCalledWith('Pikachu');
    });

    test('pagination changes page and updates URL', () => {
        const { useFetchData } = require('../hooks/useFetchData');
        const mockHandlePageChange = jest.fn();
        useFetchData.mockReturnValue({
            results: [
                { name: 'bulbasaur', description: 'http://example.com/bulbasaur' },
                { name: 'ivysaur', description: 'http://example.com/ivysaur' },
            ],
            loading: false,
            handleSearch: jest.fn(),
            throwError: jest.fn(),
            currentPage: 1,
            totalPages: 3,
            handlePageChange: mockHandlePageChange,
            fetchData: jest.fn(),
        });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('2'));
        expect(mockHandlePageChange).toHaveBeenCalledWith(2);
    });

    test('renders detailed card on card click', async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('bulbasaur'));
        await waitFor(() => {
            expect(screen.getByText('Close')).toBeInTheDocument();
        });
    });
});

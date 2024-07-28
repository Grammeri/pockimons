import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {store} from '../../store';
import App from 'src/pages/App';
import {CardItem} from '../../types';

// Mocking hooks and components
const setThemeMock = vi.fn();

vi.mock('../../hooks/useFetchData', () => ({
    useFetchData: () => ({
        results: [{name: 'Pikachu', description: 'Electric', sprites: {front_default: ''}}],
        loading: false,
        handleSearch: vi.fn(),
        throwError: vi.fn(),
        currentPage: 1,
        totalPages: 1,
        handlePageChange: vi.fn(),
        fetchData: vi.fn(),
    }),
}));

vi.mock('../../hooks/useSearchTerm', () => ({
    __esModule: true,
    default: vi.fn(() => [[], vi.fn()]),
}));

vi.mock('../../contexts/ThemeContext', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: setThemeMock,
    }),
}));

interface SearchProps {
    onSearch: (term: string) => void;
    onThrowError: () => void;
}

vi.mock('../../components/search/Search', () => ({
    Search: ({onSearch, onThrowError}: SearchProps) => (
        <div>
            <input
                data-testid="search-input"
                onChange={(e) => onSearch(e.target.value)}
            />
            <button data-testid="throw-error" onClick={onThrowError}>
                Throw Error
            </button>
        </div>
    ),
}));

interface CardListProps {
    cards: CardItem[];
    onCardClick: (card: CardItem) => void;
}

vi.mock('../../components/card-list/CardList', () => ({
    CardList: ({cards, onCardClick}: CardListProps) => (
        <div>
            {cards.map((card: CardItem) => (
                <div key={card.name} onClick={() => onCardClick(card)}>
                    {card.name}
                </div>
            ))}
        </div>
    ),
}));

interface DetailedCardProps {
    card: CardItem;
    onClose: () => void;
}

vi.mock('../../components/detailed-card/DetailedCard', () => ({
    DetailedCard: ({card, onClose}: DetailedCardProps) => (
        <div>
            <button onClick={onClose}>Close</button>
            <div>{card.name}</div>
        </div>
    ),
}));

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

vi.mock('../../components/pagination/Pagination', () => ({
    Pagination: ({currentPage, totalPages, onPageChange}: PaginationProps) => (
        <div>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    ),
}));

vi.mock('../../components/error-boundary/ErrorBoundary', () => ({
    ErrorBoundary: ({children}: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('App', () => {
    it('renders search input and buttons', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        expect(screen.getByTestId('throw-error')).toBeInTheDocument();
    });

    it('handles search input change', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const input = screen.getByTestId('search-input') as HTMLInputElement;
        fireEvent.change(input, {target: {value: 'Pikachu'}});

        expect(input.value).toBe('Pikachu');
    });

    it('handles pagination', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        const prevButton = screen.getByText('Prev');
        fireEvent.click(prevButton);

        expect(nextButton).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();
    });

    it('handles theme change', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const themeSelect = screen.getByLabelText('Choose theme:') as HTMLSelectElement;
        fireEvent.change(themeSelect, {target: {value: 'dark'}});

        expect(setThemeMock).toHaveBeenCalledWith('dark');
    });

    it('handles search input change', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const input = screen.getByTestId('search-input') as HTMLInputElement;
        fireEvent.change(input, {target: {value: 'Pikachu'}});

        expect(input.value).toBe('Pikachu');
    });
});

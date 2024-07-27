import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchData } from '../../hooks/useFetchData';
import { vi } from 'vitest';

const mockFetch = (data: any) => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }),
    ) as unknown as jest.Mock;
};

const mockFetchFailure = () => {
    global.fetch = vi.fn(() =>
        Promise.reject(new Error('Failed to fetch')),
    ) as unknown as jest.Mock;
};

describe('useFetchData hook', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches data correctly', async () => {
        const mockData = {
            count: 20,
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
        };
        mockFetch(mockData);

        const { result, waitForNextUpdate } = renderHook(() => useFetchData());

        act(() => {
            result.current.fetchData(1);
        });

        await waitForNextUpdate();

        expect(result.current.results).toEqual([
            { name: 'bulbasaur', description: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', description: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ]);
        expect(result.current.totalPages).toBe(2);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('handles errors during data fetching', async () => {
        mockFetchFailure();

        const { result, waitForNextUpdate } = renderHook(() => useFetchData());

        act(() => {
            result.current.fetchData(1);
        });

        await waitForNextUpdate();

        expect(result.current.results).toEqual([]);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch data');
    });

    it('handles search errors', async () => {
        mockFetchFailure();

        const { result, waitForNextUpdate } = renderHook(() => useFetchData());

        act(() => {
            result.current.handleSearch('unknown');
        });

        await waitForNextUpdate();

        expect(result.current.results).toEqual([]);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch data');
    });

    it('changes page correctly', async () => {
        const mockData = {
            count: 20,
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            ],
        };
        mockFetch(mockData);

        const { result, waitForNextUpdate } = renderHook(() => useFetchData());

        act(() => {
            result.current.handlePageChange(2);
        });

        await waitForNextUpdate();

        expect(result.current.currentPage).toBe(2);
        expect(result.current.loading).toBe(false);
    });

    it('throws an error with throwError function', () => {
        const { result } = renderHook(() => useFetchData());

        expect(() => {
            result.current.throwError();
        }).toThrow('Test error');
    });
});

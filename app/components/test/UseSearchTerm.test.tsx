import { renderHook, act } from '@testing-library/react-hooks';
import useSearchTerm from '../../hooks/useSearchTerm';

describe('useSearchTerm hook', () => {
    const key = 'searchTerms';

    beforeEach(() => {
        localStorage.clear();
    });

    it('loads initial search terms from localStorage', () => {
        const initialTerms = ['term1', 'term2'];
        localStorage.setItem(key, JSON.stringify(initialTerms));

        const { result } = renderHook(() => useSearchTerm(key));

        expect(result.current[0]).toEqual(initialTerms);
    });

    it('saves search terms to localStorage', () => {
        const { result } = renderHook(() => useSearchTerm(key));

        act(() => {
            result.current[1]('newTerm');
        });

        expect(localStorage.getItem(key)).toEqual(JSON.stringify(['newTerm']));
    });

    it('does not add duplicate search terms', () => {
        const { result } = renderHook(() => useSearchTerm(key));

        act(() => {
            result.current[1]('term');
            result.current[1]('term');
        });

        expect(result.current[0]).toEqual(['term']);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(['term']));
    });

    it('adds new search terms', () => {
        const { result } = renderHook(() => useSearchTerm(key));

        act(() => {
            result.current[1]('term1');
        });

        act(() => {
            result.current[1]('term2');
        });

        expect(result.current[0]).toEqual(['term1', 'term2']);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(['term1', 'term2']));
    });
});

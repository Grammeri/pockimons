import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTheme, ThemeProvider } from '../../contexts/ThemeContext';

describe('useTheme', () => {
    it('throws error if used outside of ThemeProvider', () => {
        const { result } = renderHook(() => useTheme());

        expect(result.error).toEqual(Error('useTheme must be used within a ThemeProvider'));
    });

    it('works correctly within ThemeProvider', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ThemeProvider>{children}</ThemeProvider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe('light');
        result.current.setTheme('dark');
        expect(result.current.theme).toBe('dark');
    });
});

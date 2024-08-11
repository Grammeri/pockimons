import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

const TestComponent = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme('dark')}>Set Dark Theme</button>
        </div>
    );
};

describe('ThemeProvider', () => {
    it('provides default theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('allows updating the theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        act(() => {
            screen.getByText('Set Dark Theme').click();
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
});

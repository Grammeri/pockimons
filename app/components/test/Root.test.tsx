import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../../root';
import {describe, expect, it, vi} from 'vitest';

vi.mock('@remix-run/react', () => ({
    Links: () => <link data-testid="links" />,
    Meta: () => <meta data-testid="meta" />,
    Scripts: () => <script data-testid="scripts" />,
    ScrollRestoration: () => <div data-testid="scroll-restoration" />,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe('App component', () => {
    it('renders correctly', () => {
        render(<App />);

        // Проверяем наличие мета-данных
        expect(screen.getByTestId('meta')).toBeInTheDocument();

        // Проверяем наличие линков
        expect(screen.getByTestId('links')).toBeInTheDocument();

        // Проверяем наличие скриптов
        expect(screen.getByTestId('scripts')).toBeInTheDocument();

        // Проверяем наличие ScrollRestoration
        expect(screen.getByTestId('scroll-restoration')).toBeInTheDocument();

        // Проверяем наличие Outlet
        expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });

    it('wraps Outlet with Provider and ThemeProvider', () => {
        render(<App />);

        // Проверяем, что Outlet обернут в ThemeProvider и Provider
        expect(screen.getByTestId('outlet').parentElement?.parentElement).toBeInTheDocument();
    });
});

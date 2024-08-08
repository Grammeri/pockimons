import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import MyApp from '../../pages/_app';

vi.mock('../../store', () => ({
    store: {
        getState: vi.fn(() => ({})),
        subscribe: vi.fn(),
        dispatch: vi.fn(),
    },
}));

vi.mock('../../contexts/ThemeContext', () => ({
    ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
}));

describe('MyApp', () => {
    it('renders the component with providers', () => {
        const Component = () => <div>Test Component</div>;
        const pageProps = {};

        const { getByText, getByTestId } = render(
            <MyApp Component={Component} pageProps={pageProps} />
        );

        expect(getByText('Test Component')).toBeInTheDocument();
        expect(getByTestId('theme-provider')).toBeInTheDocument();
    });
});

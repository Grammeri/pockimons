import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';

describe('ErrorBoundary component', () => {
    it('renders error message on error', () => {
        const ThrowError = () => {
            throw new Error('Test error');
        };

        const { getByText } = render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(getByText(/Something went wrong/i)).toBeInTheDocument();
    });
});

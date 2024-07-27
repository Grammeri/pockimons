import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';

describe('ErrorBoundary component', () => {
    it('catches error and displays fallback UI', () => {
        const ThrowError = () => {
            throw new Error('Test error');
        };

        const { getByText } = render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
});

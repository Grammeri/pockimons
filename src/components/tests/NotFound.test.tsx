import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../../pages/NotFound';

describe('NotFound page', () => {
    it('renders NotFound page correctly', () => {
        const { getByAltText } = render(<NotFound />);
        expect(getByAltText('404 - Page Not Found')).toBeInTheDocument();
    });
});

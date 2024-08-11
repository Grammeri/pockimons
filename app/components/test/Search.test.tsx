import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Search} from '../search/Search';
import useSearchTerm from '../../hooks/useSearchTerm';

vi.mock('../../hooks/useSearchTerm');

describe('Search', () => {
    const mockUseSearchTerm = useSearchTerm as jest.Mock;
    const mockAddSearchTerm = vi.fn();
    const mockOnSearch = vi.fn();
    const mockOnThrowError = vi.fn();

    beforeEach(() => {
        mockUseSearchTerm.mockReturnValue([[], mockAddSearchTerm]);
    });

    it('renders input and buttons correctly', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Throw Error')).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'Pikachu' } });

        expect(input).toHaveValue('Pikachu');
    });

    it('calls onSearch with the correct term when Search button is clicked', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'Pikachu' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
        expect(mockAddSearchTerm).toHaveBeenCalledWith('Pikachu');
    });

    it('calls onSearch with empty string when input is empty and Search button is clicked', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('calls onSearch with the correct term when Enter key is pressed', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'Pikachu' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
        expect(mockAddSearchTerm).toHaveBeenCalledWith('Pikachu');
    });

    it('calls onThrowError when Throw Error button is clicked', () => {
        render(<Search onSearch={mockOnSearch} onThrowError={mockOnThrowError} />);

        const throwErrorButton = screen.getByText('Throw Error');
        fireEvent.click(throwErrorButton);

        expect(mockOnThrowError).toHaveBeenCalled();
    });
});

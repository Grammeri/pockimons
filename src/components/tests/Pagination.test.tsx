import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination } from '../pagination/Pagination';
import { PaginationProps } from '../../types';

describe('Pagination', () => {
    const setup = (currentPage: number, totalPages: number, onPageChange = vi.fn()) => {
        const props: PaginationProps = {
            currentPage,
            totalPages,
            onPageChange,
        };
        render(<Pagination {...props} />);
        return props;
    };

    it('renders correctly', () => {
        setup(1, 5);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
        setup(1, 5);
        expect(screen.getByText('«')).toBeDisabled();
    });

    it('disables next button on last page', () => {
        setup(5, 5);
        expect(screen.getByText('»')).toBeDisabled();
    });

    it('calls onPageChange with correct page number when page is clicked', () => {
        const onPageChange = vi.fn();
        setup(1, 5, onPageChange);

        fireEvent.click(screen.getByText('3'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('calls onPageChange with correct page number when next or previous is clicked', () => {
        const onPageChange = vi.fn();
        setup(2, 5, onPageChange);

        fireEvent.click(screen.getByText('«'));
        expect(onPageChange).toHaveBeenCalledWith(1);

        fireEvent.click(screen.getByText('»'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });
});

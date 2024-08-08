import React from 'react';
import { PaginationProps } from '../../types';
import styles from './Pagination.module.css';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const visiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationArrow}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`${styles.paginationButton} ${currentPage === number ? 'active' : ''}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={styles.paginationArrow}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Pagination} from '../pagination/Pagination';
import {PaginationProps} from '../../types';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const renderPagination = (props: Partial<PaginationProps> = {}) => {
  const defaultProps: PaginationProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  const history = createMemoryHistory();

  return render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<Pagination {...defaultProps} {...props} />} />
      </Routes>
    </Router>
  );
};

describe('Pagination', () => {
  test('renders pagination buttons', () => {
    renderPagination();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls onPageChange with correct page number', () => {
    const onPageChange = jest.fn();
    renderPagination({ onPageChange });

    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('updates URL query parameter when page changes', () => {
    const onPageChange = jest.fn();
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />} />
        </Routes>
      </Router>
    );

    fireEvent.click(screen.getByText('2'));
    expect(history.location.search).toBe('?page=2');

    fireEvent.click(screen.getByText('3'));
    expect(history.location.search).toBe('?page=3');
  });

  test('disables previous button on first page', () => {
    renderPagination({ currentPage: 1 });
    expect(screen.getByText('«')).toBeDisabled();
  });

  test('disables next button on last page', () => {
    renderPagination({ currentPage: 5, totalPages: 5 });
    expect(screen.getByText('»')).toBeDisabled();
  });
});

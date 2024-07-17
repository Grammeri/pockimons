import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';

test('updates URL query parameter when page changes', () => {
  const history = createMemoryHistory();
  const handlePageChange = jest.fn();

  render(
      <Router location={history.location} navigator={history}>
        <Pagination currentPage={1} totalPages={3} onPageChange={handlePageChange} />
      </Router>
  );

  fireEvent.click(screen.getByText('2'));
  expect(history.location.search).toBe('?page=2');

  fireEvent.click(screen.getByText('3'));
  expect(history.location.search).toBe('?page=3');
});

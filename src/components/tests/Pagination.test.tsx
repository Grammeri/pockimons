import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../pagination/Pagination';

test('updates URL query parameter when page changes', () => {
  const handlePageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);

  fireEvent.click(screen.getByText('2'));
  expect(handlePageChange).toHaveBeenCalledWith(2);
});

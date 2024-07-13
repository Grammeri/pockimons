// src/components/tests/Search.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../Search';

test('renders search input', () => {
  render(<Search onSearch={jest.fn()} onThrowError={jest.fn()} />);
  const inputElement = screen.getByPlaceholderText(/Search/i);
  expect(inputElement).toBeInTheDocument();
});

test('calls onSearch with input value when search button is clicked', () => {
  const handleSearch = jest.fn();
  render(<Search onSearch={handleSearch} onThrowError={jest.fn()} />);

  const inputElement = screen.getByPlaceholderText(/Search/i);
  const buttonElement = screen.getByText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'pikachu' } });
  fireEvent.click(buttonElement);

  expect(handleSearch).toHaveBeenCalledWith('pikachu');
});

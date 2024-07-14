import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Добавили импорт для jest-dom
import { Search } from '../search/Search';

test('saves the entered value to the local storage when clicking the Search button', () => {
  const handleSearch = jest.fn();
  render(<Search onSearch={handleSearch} onThrowError={() => {}} />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Pikachu' } });
  fireEvent.click(screen.getByText('Search'));

  expect(localStorage.getItem('searchTerm')).toBe('Pikachu');
  expect(handleSearch).toHaveBeenCalledWith('Pikachu');
});

test('retrieves the value from the local storage upon mounting', () => {
  localStorage.setItem('searchTerm', 'Bulbasaur');
  render(<Search onSearch={() => {}} onThrowError={() => {}} />);

  expect(screen.getByRole('textbox')).toHaveValue('Bulbasaur');
});
import React from 'react';
import { SearchProps } from '../../types';
import './Search.css';

export const Search: React.FC<SearchProps> = ({ onSearch, onThrowError }) => {
  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('searchTerm') || '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    onSearch(trimmedTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={onThrowError}>Throw Error</button>
    </div>
  );
};

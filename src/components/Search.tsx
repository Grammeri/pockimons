import React, { useState, useEffect } from 'react';
import { SearchProps } from '../types.ts';

const Search = ({ onSearch, onThrowError }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchTerm') || '';
        setSearchTerm(savedSearchTerm);
    }, []);

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
}

export default Search;

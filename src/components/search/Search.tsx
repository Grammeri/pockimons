import React from 'react';
import { SearchProps } from '../../types';
import styles from './Search.module.css';
import useSearchTerm from '../../hooks/useSearchTerm';

export const Search: React.FC<SearchProps> = ({ onSearch, onThrowError }) => {
    const [searchTerms, addSearchTerm] = useSearchTerm('searchTerms');
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        console.log(`Input change: ${event.target.value}`);
    };

    const handleSearchClick = () => {
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm) {
            if (!searchTerms.includes(trimmedTerm)) {
                addSearchTerm(trimmedTerm);
            }
            console.log(`Searching for term: ${trimmedTerm}`);
            onSearch(trimmedTerm);
        } else {
            onSearch('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />
            <button onClick={handleSearchClick}>Search</button>
            <button onClick={onThrowError}>Throw Error</button>
        </div>
    );
};

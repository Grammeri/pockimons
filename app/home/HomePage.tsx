'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from '../../src/components/search/Search';
import { CardList } from '../../src/components/card-list/CardList';
import { DetailedCard } from '../../src/components/detailed-card/DetailedCard';
import { ErrorBoundary } from '../../src/components/error-boundary/ErrorBoundary';
import { Pagination } from '../../src/components/pagination/Pagination';
import styles from '../App.module.css';
import { useFetchData } from '../../src/hooks/useFetchData';
import { CardItem } from '../../src/types';
import useSearchTerm from '../../src/hooks/useSearchTerm';
import { RootState } from '../../src/store';
import { clearItems } from '../../src/slices/selectedItemsSlice';
import { setPageItems } from '../../src/slices/currentPageSlice';
import { useTheme } from '../../src/contexts/ThemeContext';

const HomePage: React.FC = () => {
    const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange, fetchData } = useFetchData();
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
    const [searchTerms, addSearchTerm] = useSearchTerm('searchTerms');
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const searchTerm = searchParams.get('search') || '';
        if (searchTerm) {
            handleSearch(searchTerm);
        } else {
            fetchData(currentPage);
        }
    }, [searchParams, fetchData, currentPage]);

    useEffect(() => {
        if (results.length > 0) {
            dispatch(setPageItems({ items: results, currentPage }));
        }
    }, [results, currentPage, dispatch]);

    const handleCardClick = (card: CardItem) => {
        setSelectedCard(selectedCard === card ? null : card);
    };

    const handleSearchChange = (searchTerm: string) => {
        setSelectedCard(null);
        if (searchTerm === '') {
            fetchData(currentPage);
            router.push('/');
        } else if (searchTerms.includes(searchTerm)) {
            handleSearch(searchTerm);
            router.push(`/?search=${searchTerm}`);
        } else {
            handleSearch(searchTerm);
            addSearchTerm(searchTerm);
            router.push(`/?search=${searchTerm}`);
        }
    };

    const handlePageChangeWithSearch = (page: number) => {
        const searchTerm = searchParams.get('search') || '';
        router.push(`/?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`);
        handlePageChange(page);
    };

    const handleUnselectAll = () => {
        dispatch(clearItems());
    };

    const handleDownload = () => {
        const csvContent = 'data:text/csv;charset=utf-8,' + selectedItems.map(item => `${item.name},${item.description}`).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${selectedItems.length}_items.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as 'light' | 'dark';
        setTheme(newTheme);
        console.log('Theme changed to:', newTheme);
    };

    return (
        <ErrorBoundary>
            <div className={`${styles.appContainer} ${theme}`}>
                <div className={styles.themeSwitcher}>
                    <label htmlFor="theme">Choose theme:</label>
                    <select id="theme" onChange={handleThemeChange} value={theme}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className={styles.topSection}>
                    <Search onSearch={handleSearchChange} onThrowError={throwError} />
                </div>
                <div className={styles.bottomSection}>
                    <div className={styles.contentWrapper}>
                        {loading ? <p>Loading...</p> : <CardList cards={results} onCardClick={handleCardClick} />}
                        {selectedCard && <DetailedCard card={selectedCard} onClose={() => setSelectedCard(null)} />}
                    </div>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChangeWithSearch} />
                {selectedItems.length > 0 && (
                    <div className={styles.flyout}>
                        <p>Items selected: {selectedItems.length}</p>
                        <button onClick={handleUnselectAll}>Unselect all</button>
                        <button onClick={handleDownload}>Download</button>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default HomePage;

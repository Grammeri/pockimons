'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@remix-run/react'; // Импортируем useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { Search } from '../../app/components/search/Search';
import { CardList } from '../../app/components/card-list/CardList';
import { DetailedCard } from '../../app/components/detailed-card/DetailedCard';
import { ErrorBoundary } from '../../app/components/error-boundary/ErrorBoundary';
import { Pagination } from '../../app/components/pagination/Pagination';
import styles from './App.module.css';
import { useFetchData } from '../../app/hooks/useFetchData';
import { CardItem } from '../../app/types';
import useSearchTerm from '../../app/hooks/useSearchTerm';
import { RootState } from '../../app/store';
import { clearItems } from '../../app/slices/selectedItemsSlice';
import { setPageItems } from '../../app/slices/currentPageSlice';
import { useTheme } from '../../app/contexts/ThemeContext';

const HomePage: React.FC = () => {
    const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange, fetchData } = useFetchData();
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
    const [searchTerms, addSearchTerm] = useSearchTerm('searchTerms');
    const params = useParams();
    const navigate = useNavigate(); // Используем useNavigate вместо useRouter
    const dispatch = useDispatch();
    const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search || '';
        if (searchTerm) {
            handleSearch(searchTerm);
        } else {
            fetchData(currentPage);
        }
    }, [params, fetchData, currentPage]);

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
            navigate('/'); // Заменяем router.push на navigate
        } else if (searchTerms.includes(searchTerm)) {
            handleSearch(searchTerm);
            navigate(`/?search=${searchTerm}`); // Заменяем router.push на navigate
        } else {
            handleSearch(searchTerm);
            addSearchTerm(searchTerm);
            navigate(`/?search=${searchTerm}`); // Заменяем router.push на navigate
        }
    };

    const handlePageChangeWithSearch = (page: number) => {
        const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search || '';
        navigate(`/?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`); // Заменяем router.push на navigate
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
            <div
                data-testid="home-page-container"
                className={`${styles.appContainer} ${theme === 'light' ? styles.light : styles.dark}`}
            >
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

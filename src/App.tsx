import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search } from './components/search/Search';
import { CardList } from './components/card-list/CardList';
import { DetailedCard } from './components/detailed-card/DetailedCard';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { Pagination } from './components/pagination/Pagination';
import './App.css';
import { useFetchData } from './hooks/useFetchData';
import { CardItem } from './types';
import useSearchTerm from './hooks/useSearchTerm';

const App = (): React.ReactNode => {
  const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange, fetchData } = useFetchData();
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [searchTerms, addSearchTerm] = useSearchTerm('searchTerms');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search') || '';
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      fetchData(currentPage);
    }
  }, [location.search, fetchData, currentPage]);

  const handleCardClick = (card: CardItem) => {
    setSelectedCard(selectedCard === card ? null : card);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSelectedCard(null);
    if (searchTerm === '') {
      fetchData(currentPage);
      navigate({ search: '' });
    } else if (searchTerms.includes(searchTerm)) {
      handleSearch(searchTerm);
      navigate({ search: `?search=${searchTerm}` });
    } else {
      handleSearch(searchTerm);
      addSearchTerm(searchTerm);
      navigate({ search: `?search=${searchTerm}` });
    }
  };

  const handlePageChangeWithSearch = (page: number) => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search') || '';
    navigate({ search: `?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}` });
    handlePageChange(page);
  };

  return (
      <ErrorBoundary>
        <div className="app-container">
          <div className="top-section">
            <Search onSearch={handleSearchChange} onThrowError={throwError} />
          </div>
          <div className="bottom-section">
            {loading ? <p>Loading...</p> : <CardList cards={results} onCardClick={handleCardClick} />}
            {selectedCard && <DetailedCard card={selectedCard} onClose={() => setSelectedCard(null)} />}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChangeWithSearch} />
          <Outlet />
        </div>
      </ErrorBoundary>
  );
};

export default App;

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Search } from './components/search/Search';
import { CardList } from './components/card-list/CardList';
import { DetailedCard } from './components/detailed-card/DetailedCard';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { Pagination } from './components/pagination/Pagination';
import './App.css';
import { useFetchData } from './hooks/useFetchData';
import { CardItem } from './types';

const App = (): React.ReactNode => {
  const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange } = useFetchData();
  const [selectedCard, setSelectedCard] = React.useState<CardItem | null>(null);
  const [allCards, setAllCards] = React.useState<CardItem[]>([]); // New state for all cards

  useEffect(() => {
    setAllCards(results);
  }, [results]);

  const handleCardClick = (card: CardItem) => {
    setSelectedCard(selectedCard === card ? null : card); // Toggle detailed card display
  };

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm === '') {
      setSelectedCard(null);
      setAllCards(results); // Reset to all cards when search term is cleared
    }
    handleSearch(searchTerm);
  };

  return (
      <ErrorBoundary>
        <div className="app-container">
          <div className="top-section">
            <Search onSearch={handleSearchChange} onThrowError={throwError} />
          </div>
          <div className="bottom-section">
            {loading ? <p>Loading...</p> : <CardList cards={allCards} onCardClick={handleCardClick} />} {/* Use allCards for CardList */}
            {selectedCard && <DetailedCard card={selectedCard} onClose={() => setSelectedCard(null)} />}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <Outlet />
        </div>
      </ErrorBoundary>
  );
};

export default App;

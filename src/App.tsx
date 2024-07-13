import React from 'react';
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

  const handleCardClick = (card: CardItem) => {
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <div className="top-section">
          <Search onSearch={handleSearch} onThrowError={throwError} />
        </div>
        <div className="bottom-section">

          {loading ? <p>Loading...</p> : <CardList cards={results} onCardClick={handleCardClick} />}
          {selectedCard && <DetailedCard card={selectedCard} onClose={handleCloseDetail} />}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;

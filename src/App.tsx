// App.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from './components/search/Search';
import { CardList } from './components/card-list/CardList';
import { DetailedCard } from './components/detailed-card/DetailedCard';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { Pagination } from './components/pagination/Pagination';
import './App.css';
import { useFetchData } from './hooks/useFetchData';
import { CardItem } from './types';
import useSearchTerm from './hooks/useSearchTerm';
import { RootState } from './store';
import { clearItems } from './slices/selectedItemsSlice';

const App = (): React.ReactNode => {
  const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange, fetchData } = useFetchData();
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [searchTerms, addSearchTerm] = useSearchTerm('searchTerms');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

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

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvContent = 'data:text/csv;charset=utf-8,'
        + selectedItems.map(item => `${item.name},${item.description}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <ErrorBoundary>
        <div className="app-container">
          <div className="top-section">
            <Search onSearch={handleSearchChange} onThrowError={throwError} />
          </div>
          <div className="bottom-section">
            <div className="content-wrapper">
              {loading ? <p>Loading...</p> : <CardList cards={results} onCardClick={handleCardClick} />}
              {selectedCard && <DetailedCard card={selectedCard} onClose={() => setSelectedCard(null)} />}
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChangeWithSearch} />
          <Outlet />
          {selectedItems.length > 0 && (
              <div className="flyout">
                <p>Items selected: {selectedItems.length}</p>
                <button onClick={handleUnselectAll}>Unselect all</button>
                <button onClick={handleDownload}>Download</button>
              </div>
          )}
        </div>
      </ErrorBoundary>
  );
};

export default App;

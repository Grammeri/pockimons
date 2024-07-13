// src/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Search } from './components/Search';
import { Card } from './components/Card';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';
import { useFetchData } from './hooks/useFetchData';

const App = ():React.ReactNode => {
  const { results, loading, handleSearch, throwError } = useFetchData();

  return (
    <ErrorBoundary>
      <div className="app-container">
        <div className="top-section">
          <Search onSearch={handleSearch} onThrowError={throwError} />
        </div>
        <div className="bottom-section">
          {loading ? <p>Loading...</p> : <Card results={results} />}
        </div>
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;

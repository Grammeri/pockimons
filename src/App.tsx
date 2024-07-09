import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { Pokemon } from './types.ts';

const App = () => {
    const [results, setResults] = useState<{ name: string; description: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData(localStorage.getItem('searchTerm') || '');
    }, []);

    const fetchData = (term: string) => {
        setLoading(true);
        const apiUrl = term
          ? `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0&search=${term}`
          : 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              const results = data.results.map((item: Pokemon) => ({
                  name: item.name,
                  description: item.url,
              }));
              setResults(results);
              setLoading(false);
          })
          .catch(error => {
              console.error("Error fetching data:", error);
              setLoading(false);
          });
    };

    const handleSearch = (term: string) => {
        fetchData(term);
    };

    const throwError = () => {
        throw new Error('Test error');
    };

    return (
      <ErrorBoundary>
          <div className="app-container">
              <div className="top-section">
                  <Search onSearch={handleSearch} onThrowError={throwError} />
              </div>
              <div className="bottom-section">
                  {loading ? <p>Loading...</p> : <Results results={results} />}
              </div>
          </div>
      </ErrorBoundary>
    );
}

export default App;

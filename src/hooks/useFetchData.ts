import { useState, useEffect } from 'react';
import { Pokemon } from '../types';

export const useFetchData = () => {
  const [results, setResults] = useState<{ name: string; description: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    const trimmedTerm = term.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    fetchData(trimmedTerm);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    fetchData(savedSearchTerm);
  }, []);

  return { results, loading, handleSearch, throwError };
};

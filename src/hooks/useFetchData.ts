// useFetchData.ts
import { useState, useEffect, useCallback } from 'react';
import { ApiResult, CardItem } from '../types';

export const useFetchData = () => {
  const [results, setResults] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
      const data = await response.json();
      const items = await Promise.all(data.results.map(async (item: ApiResult) => {
        const pokemonResponse = await fetch(item.url);
        const pokemonData = await pokemonResponse.json();
        return {
          name: item.name,
          description: item.url,
          sprites: {
            front_default: pokemonData.sprites.front_default,
          },
        };
      }));
      setResults(items);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm === '') {
      fetchData(currentPage);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await response.json();
      const item = {
        name: data.name,
        description: data.url,
        sprites: {
          front_default: data.sprites.front_default,
        },
      };
      setResults([item]);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    throwError,
    fetchData,
  };
};

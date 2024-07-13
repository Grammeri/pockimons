import { useState, useEffect } from 'react';
import { CardItem } from '../types';

export const useFetchData = () => {
  const [results, setResults] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
      const data = await response.json();
      const items = data.results.map((item: any) => ({
        name: item.name,
        description: item.url,
      }));
      setResults(items);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1);
    fetchData(1); // Обновление данных при поиске
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
  };
};

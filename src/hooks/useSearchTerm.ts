import { useState, useEffect } from 'react';

const useSearchTerm = (key: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchTerm);
    };
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;

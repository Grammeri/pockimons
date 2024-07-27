import { useState, useEffect } from 'react';

const useSearchTerm = (key: string) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(() => {
    const storedTerms = localStorage.getItem(key);
    const terms = storedTerms ? JSON.parse(storedTerms) : [];
    return terms;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(searchTerms));
  }, [key, searchTerms]);

  const addSearchTerm = (term: string) => {
    if (!searchTerms.includes(term)) {
      setSearchTerms([...searchTerms, term]);
    }
  };

  return [searchTerms, addSearchTerm] as const;
};

export default useSearchTerm;

import {useEffect, useRef, useState} from 'react';

type MovieArgs = {
  searchTerm: string;
  page: number;
};

const {
  ODBM_API_KEY,
  ODBM_API_URL,
} = process.env;

export const useFetchMovies = () => {
  const [fetchedMovies, setFetchedMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFetchMovies = async ({searchTerm, page}: MovieArgs) => {
    // Abort the previous request if it's still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    const abortController = new AbortController();
    const signal = abortController.signal;

    abortControllerRef.current = abortController;

    const params = new URLSearchParams({
      apikey: ODBM_API_KEY!,
      s: searchTerm,
      page: page.toString(),
    });

    try {
      const response = await fetch(`${ODBM_API_URL}?${params.toString()}`, {
        signal,
      });
      const data = await response.json();
      setFetchedMovies(data);
      setIsLoading(false);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up the AbortController when the component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    handleFetchMovies,
    fetchedMovies,
    isLoading,
  };
};

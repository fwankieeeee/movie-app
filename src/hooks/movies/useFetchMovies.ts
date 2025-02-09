import {useEffect, useRef, useState} from 'react';

type MovieArgs = {
  searchTerm: string;
  page: number;
};

const {ODBM_API_KEY = 'b9bd48a6', ODBM_API_URL = 'https://www.omdbapi.com/'} =
  process.env;

export const useFetchMovies = () => {
  const [fetchedData, setFetchedData] = useState<Record<string, any>[]>([]);
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFetchMovies = async ({searchTerm, page}: MovieArgs) => {
    // Abort the previous request if it's still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(true);

    // Create a new AbortController for the current request
    const abortController = new AbortController();
    const signal = abortController.signal;

    abortControllerRef.current = abortController;

    const params = new URLSearchParams({
      apikey: ODBM_API_KEY!,
      s: searchTerm,
      page: page.toString(),
    });
    const url = `${ODBM_API_URL}?${params.toString()}`;
    try {
      const response = await fetch(url, {
        signal,
      });
      const data = await response.json();

      if (data.Error) throw data;

      const newData = [...fetchedData,...(data.Search ?? [])];
      const uniqueData = Array.from(
        new Map(newData.map(item => [item.imdbID, item])).values(),
      );
      setFetchedData(uniqueData);
      setDataCount(Number(data.totalResults));
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request aborted');
      } else {
        console.error(error);
      }

      if (typeof error === 'object' && error !== null && 'Error' in error) {
        setError((error as {Error: string}).Error);
        setDataCount(0);
        setFetchedData([])
      } else {
        setError('An unknown error occurred');
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchMovieById = async (movieId: string) => {
    setIsLoading(true);
    try {
      // Create a new AbortController for the current request
      const abortController = new AbortController();
      const signal = abortController.signal;

      abortControllerRef.current = abortController;

      const params = new URLSearchParams({
        apikey: ODBM_API_KEY!,
        i: movieId,
      });

      const url = `${ODBM_API_URL}?${params.toString()}`;
      const response = await fetch(url, {
        signal,
      });

      const data = await response.json();
      setFetchedData(data);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request aborted');
      } else {
        console.error(error);
      }

      if (typeof error === 'object' && error !== null && 'Error' in error) {
        setError((error as {Error: string}).Error);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    return () => {
      // Clean up the AbortController when the component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    dataCount,
    fetchedData,
    isLoading,
    error,
    handleFetchMovies,
    handleFetchMovieById,
  };
};

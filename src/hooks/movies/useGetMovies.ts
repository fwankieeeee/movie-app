import {useInfiniteQuery} from '@tanstack/react-query';
import {useRef} from 'react';

const {ODBM_API_KEY = 'b9bd48a6', ODBM_API_URL = 'https://www.omdbapi.com/'} =
  process.env;

type TMovieData = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any;
};


export const useGetMovies = (searchTerm: string) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFetchMovies = async ({pageParam = 1}) => {
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
      page: pageParam.toString(),
    });
    const url = `${ODBM_API_URL}?${params.toString()}`;
    try {
      const response = await fetch(url, {
        signal,
      });
      const data = await response.json();

      if (data.Error) throw data;

      return data.Search;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request aborted');
      } else {
        console.error(error);
      }
    }
  };

  return useInfiniteQuery({
    queryKey: ['movies'],
    initialPageParam: 1,
    queryFn: handleFetchMovies,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 0) return undefined;
      return pages.length + 1;
    },
  });
};

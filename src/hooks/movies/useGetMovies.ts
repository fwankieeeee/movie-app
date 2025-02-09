import { OMDB_API_KEY, OMDB_API_URL } from '@env';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';

export const useGetMovies = (searchTerm: string, movieType?: string) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFetchMovies = async ({pageParam = 1}) => {
    if (!searchTerm) return;

    // Abort the previous request if it's still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    const abortController = new AbortController();
    const signal = abortController.signal;

    abortControllerRef.current = abortController;

    const params = new URLSearchParams({
      ...(movieType && {type: movieType}),
      apikey: OMDB_API_KEY!,
      s: searchTerm,
      page: pageParam.toString(),
    });
    const url = `${OMDB_API_URL}?${params.toString()}`;
    try {
      const response = await fetch(url, {
        signal,
      });
      const data = await response.json();

      if (data.Error) throw data;

      return data.Search;
    } catch (error: unknown) {
      // throw error;
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
    staleTime: Infinity,
    throwOnError: true,
  });
};

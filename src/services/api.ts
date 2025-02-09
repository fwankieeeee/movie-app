import { TMovieData } from '@/types';
import {
  OMDB_API_KEY, OMDB_API_URL
} from '@env';

export const fetchMovieById = async (
  movieId: string,
): Promise<TMovieData | null> => {
  try {
    // Create a new AbortController for the current request
    const abortController = new AbortController();
    const signal = abortController.signal;

    const params = new URLSearchParams({
      apikey: OMDB_API_KEY!,
      i: movieId,
    });

    const url = `${OMDB_API_URL}?${params.toString()}`;
    const response = await fetch(url, {
      signal,
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return null;
  }
};

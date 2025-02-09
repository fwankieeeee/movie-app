export type SortOption = {
  field: 'Title' | 'Year';
  order: 'asc' | 'desc';
};

export type TMovieData = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any;
};
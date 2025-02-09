import { SortOption } from '@/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PATHS from './paths';

export type RootStackParamList = {
  [PATHS.Home]: undefined;
  [PATHS.Details]: {
    imdbID: string;
  };
  [PATHS.Favorites]: undefined;
  [PATHS.RootDrawer]: undefined;
  [PATHS.Search]: undefined;
  [PATHS.MoviesTabs]: undefined;
  [PATHS.Filter]: {
    currentSort: SortOption | null;
    onApplyFilter: (option: SortOption | null) => void;
  };
};

export type RootScreenProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, T>;

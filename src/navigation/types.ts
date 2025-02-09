import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PATHS from './paths';
import { SortOption } from '@/screens/Filter';

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
    currentSort: SortOption;
    onApplyFilter: (option: SortOption) => void;
  };
};

export type RootScreenProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, T>;

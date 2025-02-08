import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PATHS from './paths';

export type RootStackParamList = {
  [PATHS.Home]: undefined;
  [PATHS.Details]: {
    id: number;
  };
  [PATHS.Favorites]: undefined;
  [PATHS.RootDrawer]: undefined;
};

export type RootScreenProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, T>;

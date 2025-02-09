import { MovieCard, SafeScreen } from '@/components';
import PATHS from '@/navigation/paths';
import { fetchMovieById } from '@/services/api';
import { favoritesStorage } from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useQueries } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { HeartIcon as HeartOutlineIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartSolidIcon } from 'react-native-heroicons/solid';
import homeStyles from '../Home/styles';
import styles from './styles';

const getFavorites = () => {
  const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
  return favoritesList;
};

const Favorites = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [favoritesList, setFavoritesList] = useState(getFavorites());
  const favoritesQueries = useQueries({
    queries: favoritesList.map((movieId: string) => ({
      queryKey: ['movie', movieId, navigation],
      queryFn: () => fetchMovieById(movieId),
    })),
  });

  const [localFavorites, setLocalFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setFavoritesList(getFavorites());
    }, [navigation, localFavorites]),
  );

  const fetchedMoviesData = favoritesQueries.reduce((acc: any, item) => {
    const {isSuccess, data} = item;
    if (isSuccess && data) {
      return [...acc, data];
    }
    return acc;
  }, []);

  // handlers
  const handleOnPressCardPoster = (imdbID: string) => {
    navigation.navigate(PATHS.Details, {imdbID});
  };

  const toggleFavorite = (movieId: string) => {
    const favoritesList = getFavorites();
    const newFavorites = favoritesList.includes(movieId)
      ? favoritesList.filter((id: string) => id !== movieId)
      : [...favoritesList, movieId];
    setLocalFavorites(newFavorites);
    favoritesStorage.set('favorites', JSON.stringify(newFavorites));
  };

  const renderItem = ({item}: {item: {imdbID: string; [key: string]: any}}) => {
    return <MovieCard navigation={navigation} item={item} />
  };

  return (
    <SafeScreen>
      <View style={homeStyles.headerView}>
        <Text style={homeStyles.headerTitle}>Favorites</Text>
      </View>
      <FlatList
        data={fetchedMoviesData}
        numColumns={2}
        showsVerticalScrollIndicator
        columnWrapperStyle-={styles.columnWrapper}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
    </SafeScreen>
  );
};

export default Favorites;

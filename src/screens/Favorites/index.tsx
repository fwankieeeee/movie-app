import {MovieCard, SafeScreen} from '@/components';
import {fetchMovieById} from '@/services/api';
import {favoritesStorage} from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useQueries} from '@tanstack/react-query';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
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

  useFocusEffect(
    useCallback(() => {
      setFavoritesList(getFavorites());
    }, [navigation]),
  );

  const fetchedMoviesData = favoritesQueries.reduce((acc: any, item) => {
    const {isSuccess, data} = item;
    if (isSuccess && data) {
      return [...acc, data];
    }
    return acc;
  }, []);

  const renderItem = ({item}: {item: {imdbID: string; [key: string]: any}}) => {
    return <MovieCard navigation={navigation} item={item} />;
  };

  return (
    <SafeScreen>
      <View style={homeStyles.headerView}>
        <Text style={homeStyles.headerTitle}>Favorites</Text>
      </View>
      {fetchedMoviesData.length > 0 ? (
        <FlatList
          data={fetchedMoviesData}
          numColumns={2}
          showsVerticalScrollIndicator
          columnWrapperStyle-={styles.columnWrapper}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start adding movies to your favorites by tapping the movie card's heart icon!
          </Text>
        </View>
      )}
    </SafeScreen>
  );
};

export default Favorites;

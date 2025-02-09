import { SafeScreen } from '@/components';
import { useFetchMovies } from '@/hooks';
import PATHS from '@/navigation/paths';
import { favoritesStorage } from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useQueries } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Bars3Icon, HeartIcon as HeartOutlineIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartSolidIcon } from 'react-native-heroicons/solid';
import homeStyles from '../Home/styles';
import styles from './styles';

const Favorites = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {handleFetchMovieById} = useFetchMovies();
  const favoritestList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
  const favoritesQueries = useQueries({
    queries: favoritestList.map((movieId: string) => ({
      queryKey: ['movie', movieId],
      queryFn: () => handleFetchMovieById(movieId),
    })),
  });

  const [, setFavorites] = useState([]);

  const fetchedMoviesData = favoritesQueries.reduce((acc: any, item) => {
    const {isSuccess, data} = item;
    if (isSuccess && data) {
      return [...acc, data];
    }
    return acc;
  }, []);
  
  console.log("%c Line:110 🥔 fetchedMoviesData", "color:#4fff4B", fetchedMoviesData);


  // handlers
  const handleOnPressCardPoster = (imdbID: string) => {
    navigation.navigate(PATHS.Details, {imdbID});
  };

  const handleOnPressSearch = () => {
    navigation.navigate(PATHS.Search);
  };

  const handleOnPressDrawerOpen = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const toggleFavorite = (movieId: string) => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
    const newFavorites = favoritesList.includes(movieId)
      ? favoritesList.filter((id: string) => id !== movieId)
      : [...favoritesList, movieId];
    setFavorites(newFavorites);
    favoritesStorage.set('favorites', JSON.stringify(newFavorites));
  };

  const renderItem = ({item}: {item: {imdbID: string; [key: string]: any}}) => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites');
    const isFavorite =
      favoritesList && (favoritesList as string[]).includes(item.imdbID);
    return (
      <TouchableOpacity onPress={() => handleOnPressCardPoster(item.imdbID)}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: item.Poster}}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.imdbID)}>
            {isFavorite ? (
              <HeartSolidIcon size={24} color="red" />
            ) : (
              <HeartOutlineIcon size={24} color="white" />
            )}
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.Title}
            </Text>
            <Text style={styles.year}>{item.Year}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeScreen>
      <View style={homeStyles.headerView}>
        <TouchableOpacity onPress={handleOnPressDrawerOpen}>
          <Bars3Icon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={homeStyles.headerTitle}>Favorites</Text>
        <TouchableOpacity onPress={handleOnPressSearch}>
          <MagnifyingGlassIcon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
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

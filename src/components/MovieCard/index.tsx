import PATHS from '@/navigation/paths';
import {favoritesStorage, recentSearchStorage} from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import {HeartIcon as HeartOutlineIcon} from 'react-native-heroicons/outline';
import {HeartIcon as HeartSolidIcon} from 'react-native-heroicons/solid';
import styles from './styles';

type IMovieCardProps = {
  item: {
    imdbID: string;
    [key: string]: any;
  };
  navigation: any;
};

const MovieCard = ({item, navigation}: IMovieCardProps) => {
  const [favorites, setFavorites] = useState(
    getStoredObjects(favoritesStorage, 'favorites'),
  );

  const isFavorite = favorites && (favorites as string[]).includes(item.imdbID);

  const handleOnPressCardPoster = (imdbID: string) => {
    const recentSearchesIds =
      getStoredObjects(recentSearchStorage, 'recent') ?? [];

    if (!recentSearchesIds.includes(imdbID)) {
      recentSearchStorage.set(
        'recent',
        JSON.stringify([...recentSearchesIds, imdbID]),
      );
    }
    navigation.navigate(PATHS.Details, {imdbID});
  };

  const toggleFavorite = (movieId: string) => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
    const newFavorites = favoritesList.includes(movieId)
      ? favoritesList.filter((id: string) => id !== movieId)
      : [...favoritesList, movieId];
    setFavorites(newFavorites);
    favoritesStorage.set('favorites', JSON.stringify(newFavorites));
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleOnPressCardPoster(item.imdbID)}>
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
    </TouchableOpacity>
  );
};

export default MovieCard;

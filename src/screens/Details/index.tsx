import { SafeScreen } from '@/components';
import { RootStackParamList } from '@/navigation/types';
import { fetchMovieById } from '@/services/api';
import { favoritesStorage } from '@/services/storage';
import getScoreColor from '@/utils/getScoreColor';
import getStoredObjects from '@/utils/getStoredObject';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HeartIcon as HeartOutlineIcon } from 'react-native-heroicons/outline';
import {
  ChevronLeftIcon,
  HeartIcon as HeartSolidIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import styles from './styles';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'details'>;

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();
  const movieId = route.params.imdbID;

  const {
    data: fetchedData,
    isLoading: isLoadingFetchMovieById,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieById(movieId),
    throwOnError: true,
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
    setIsFavorite(favoritesList.includes(movieId));
  }, [movieId]);

  const handleBack = () => {
    navigation.goBack();
  };

  // helpers
  const toggleFavorite = () => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
    const newFavorites = favoritesList.includes(movieId)
      ? favoritesList.filter((id: string) => id !== movieId)
      : [...favoritesList, movieId];
    setIsFavorite(!isFavorite);
    favoritesStorage.set('favorites', JSON.stringify(newFavorites));
  };

  useFocusEffect(
    useCallback(() => {
      fetchMovieById(movieId);
    }, [movieId, navigation]),
  );

  return (
    <SafeScreen>
      <ScrollView>
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeftIcon size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFavorite}
            style={styles.favoriteButton}>
            {isFavorite ? (
              <HeartSolidIcon size={28} color="red" />
            ) : (
              <HeartOutlineIcon size={28} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {isLoadingFetchMovieById ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : !fetchedData ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Movie details not found</Text>
          </View>
        ) : (
          <>
            {/* Movie Poster */}
            <View style={styles.posterContainer}>
              <Image
                source={{uri: fetchedData.Poster}}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <View style={styles.posterOverlay}>
                <Text style={styles.overlayTitle}>{fetchedData?.Title}</Text>
                <Text style={styles.overlayYear}>{fetchedData.Year}</Text>
              </View>
            </View>

            {/* Movie Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.statsContainer}>
                <Text style={styles.statsText}>{fetchedData.Genre}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.statsText}>{fetchedData.Runtime}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <View style={styles.ratingWrapper}>
                  <StarIcon size={16} color="gold" />
                  <Text style={styles.statsText}>{fetchedData.imdbRating}</Text>
                </View>
              </View>

              {/* Plot */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.plot}>{fetchedData.Plot}</Text>
              </View>

              {/* Scores */}
              <View style={styles.scoresContainer}>
                <View style={styles.scoreItem}>
                  <View
                    style={[
                      styles.scoreBox,
                      {backgroundColor: getScoreColor(fetchedData.Metascore)},
                    ]}>
                    <Text style={styles.scoreValue}>
                      {fetchedData.Metascore}
                    </Text>
                  </View>
                  <Text style={styles.scoreLabel}>Score</Text>
                </View>
                <View style={styles.scoreItem}>
                  <View style={[styles.scoreBox, {backgroundColor: '#f5c518'}]}>
                    <Text style={styles.scoreValue}>
                      {fetchedData.imdbRating}
                    </Text>
                  </View>
                  <Text style={styles.scoreLabel}>Rating</Text>
                </View>
                <View style={styles.scoreItem}>
                  <View style={[styles.scoreBox, {backgroundColor: '#6c757d'}]}>
                    <Text style={styles.scoreValue}>
                      {fetchedData.imdbVotes}
                    </Text>
                  </View>
                  <Text style={styles.scoreLabel}>Votes</Text>
                </View>
              </View>

              {/* Director */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Director</Text>
                <Text style={styles.sectionText}>{fetchedData.Director}</Text>
              </View>

              {/* Writer */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Writer</Text>
                <Text style={styles.sectionText}>{fetchedData.Writer}</Text>
              </View>
              {/* Cast */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                <Text style={styles.sectionText}>{fetchedData.Actors}</Text>
              </View>
              {/* Awards */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Awards</Text>
                <Text style={styles.sectionText}>{fetchedData.Awards}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default Details;

import {SafeScreen} from '@/components';
import {useFetchMovies} from '@/hooks';
import {RootStackParamList} from '@/navigation/types';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, StarIcon} from 'react-native-heroicons/solid';
import styles from './styles';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'details'>;

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();
  const {handleFetchMovieById, isLoading, fetchedData} = useFetchMovies();

  const handleBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchMovieById(route.params.imdbID);
    }, [route.params.imdbID]),
  );

  return (
    <SafeScreen>
      <ScrollView>
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeftIcon size={28} color="white" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
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
            </View>

            {/* Movie Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{fetchedData.Title}</Text>

              {/* Rating and Year */}
              <View style={styles.ratingContainer}>
                <StarIcon size={20} color="gold" />
                <Text style={styles.rating}>{fetchedData.imdbRating}</Text>
                <Text style={styles.year}>• {fetchedData.Year}</Text>
                <Text style={styles.runtime}>• {fetchedData.Runtime}</Text>
              </View>

              {/* Genre */}
              <Text style={styles.genre}>{fetchedData.Genre}</Text>

              {/* Plot */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Plot</Text>
                <Text style={styles.plot}>{fetchedData.Plot}</Text>
              </View>

              {/* Director */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Director</Text>
                <Text style={styles.sectionText}>{fetchedData.Director}</Text>
              </View>

              {/* Cast */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                <Text style={styles.sectionText}>{fetchedData.Actors}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default Details;

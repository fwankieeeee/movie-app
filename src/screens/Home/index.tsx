import { MovieCard, SafeScreen } from '@/components';
import PATHS from '@/navigation/paths';
import { fetchMovieById } from '@/services/api';
import getRecentSearchesIds from '@/utils/getRecentSearchesIds';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useQueries } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import {
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline';
import favoritesStyles from '../Favorites/styles';
import styles from './styles';

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [recentSearches, setRecentSearches] = useState(getRecentSearchesIds());
  const recentSearchesQueries = useQueries({
    queries: recentSearches.map((movieId: string) => ({
      queryKey: ['movie', movieId, navigation],
      queryFn: () => fetchMovieById(movieId),
    })),
  });

  const fetchedMoviesData = recentSearchesQueries.reduce((acc: any, item) => {
    const {isSuccess, data} = item;
    if (isSuccess && data) {
      return [...acc, data];
    }
    return acc;
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRecentSearches(getRecentSearchesIds());
    }, [navigation]),
  );

  const handleOnPressSearch = () => {
    navigation.navigate(PATHS.Search);
  };

  const renderItem = ({item}: {item: {imdbID: string; [key: string]: any}}) => {
    return <MovieCard navigation={navigation} item={item} />
  };

  return (
    <SafeScreen>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>Top Rated Movies</Text>
        <TouchableOpacity onPress={handleOnPressSearch}>
          <MagnifyingGlassIcon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {fetchedMoviesData.length > 0 ? (
          <FlatList
            data={fetchedMoviesData}
            numColumns={2}
            showsVerticalScrollIndicator
            columnWrapperStyle-={favoritesStyles.columnWrapper}
            renderItem={renderItem}
            keyExtractor={item => item.imdbID}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent searches</Text>
            <Text style={[styles.emptyText, styles.promptText]}>
              Start exploring amazing movies by tapping the search icon above!
            </Text>
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default Home;

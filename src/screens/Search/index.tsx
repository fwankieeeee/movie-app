import {SafeScreen} from '@/components';
import {useGetMovies} from '@/hooks';
import {useDebounce} from '@/hooks/debounce';
import PATHS from '@/navigation/paths';
import {favoritesStorage, recentSearchStorage} from '@/services/storage';
import {SortOption} from '@/types';
import getStoredObjects from '@/utils/getStoredObject';
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {
  ChevronLeftIcon,
  FunnelIcon,
  HeartIcon as HeartOutlineIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon as HeartSolidIcon} from 'react-native-heroicons/solid';
import styles from './styles';

type TFilters = SortOption & {type: 'movie' | 'episodes' | 'series'};

const Search = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');
  const [, setFavorites] = useState([]);
  const [filters, setFilters] = useState<TFilters | null>(null);

  const debouncedText = useDebounce(searchText.toLowerCase(), 500);
  const {
    data,
    isLoading,
    isFetching,
    isError: isErrorGetMovies,
    error,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useGetMovies(debouncedText, filters?.type);
  const fetchedData = data?.pages?.filter(Boolean)?.flat() ?? [];

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    if (debouncedText.length >= 3) {
      fetchNextPage();
    }
    queryClient.resetQueries();

    return () => {};
  }, [debouncedText]);

  useEffect(() => {
    refetch();
  }, [filters?.type]);

  const memoizedFetchedData = useMemo(() => {
    // Sort your movie list here based on the option
    if (!filters) {
      return fetchedData;
    }
    const sortedMovies = fetchedData.sort((a, b) => {
      const aValue = a[filters.field];
      const bValue = b[filters.field];
      if (filters.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
    return sortedMovies;
  }, [fetchedData, filters]);

  // handlers
  const handleApplyFilter = (filter: TFilters) => {
    setFilters(filter);
  };

  const handleOnPressFilter = () => {
    navigation.navigate(PATHS.Filter, {
      onApplyFilter: handleApplyFilter,
      currentSort: filters,
    });
  };

  const handleOnPressCardPoster = (imdbID: string) => {
    const recentSearchesIds =
      getStoredObjects(recentSearchStorage, 'recent') ?? [];
    recentSearchStorage.set(
      'recent',
      JSON.stringify([...recentSearchesIds, imdbID]),
    );
    navigation.navigate(PATHS.Details, {imdbID});
  };

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleOnPressClear = () => {
    setSearchText('');
  };

  const handleOnEndReached = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleOnRefresh = () => {
    fetchNextPage();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // helpers
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

  const ListFooterComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeScreen>
      <View style={styles.searchView}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleOnChangeText}
            placeholderTextColor="lightgray"
            placeholder="Search Movies"
          />
          {searchText.length > 0 && isLoading ? (
            <ActivityIndicator
              size="small"
              color="black"
              style={styles.loadingIndicator}
            />
          ) : searchText.length > 0 ? (
            <TouchableOpacity onPress={handleOnPressClear}>
              <XCircleIcon size={25} color="black" />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptySearchIcon} />
          )}
        </View>
        {/* filter and sort */}
        <TouchableOpacity
          style={styles.filterSearchIcon}
          onPress={handleOnPressFilter}>
          <FunnelIcon strokeWidth={2} size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {!searchText ? (
        <View style={styles.welcomeContainer}>
          <Image
            source={require('@/assets/images/undraw_horror-movie_9020.png')}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
          <Text style={styles.welcomeTitle}>Discover Movies</Text>
          <Text style={styles.welcomeText}>
            Search for your favorite movies, TV shows, and more
          </Text>
        </View>
      ) : fetchedData && fetchedData.length > 0 ? (
        <FlatList
          data={memoizedFetchedData}
          numColumns={2}
          showsVerticalScrollIndicator
          columnWrapperStyle-={styles.columnWrapper}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooterComponent}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={handleOnRefresh}
              tintColor="#fff"
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isErrorGetMovies ? error.message : ''}
          </Text>
        </View>
      )}
    </SafeScreen>
  );
};

export default Search;

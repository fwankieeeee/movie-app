import { SafeScreen } from '@/components';
import { useGetMovies } from '@/hooks';
import { useDebounce } from '@/hooks/debounce';
import PATHS from '@/navigation/paths';
import { favoritesStorage } from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';
import {
  HeartIcon as HeartOutlineIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import { HeartIcon as HeartSolidIcon } from 'react-native-heroicons/solid';
import styles from './styles';

const Search = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');
  const [, setFavorites] = useState([]);
  const debouncedText = useDebounce(searchText.toLowerCase(), 500);
  const currentPageNumber = useRef(1);

  const {
    data,
    isLoading,
    isError: isErrorGetMovies,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetMovies(debouncedText);
  const fetchedData = data?.pages
    ?.filter(Boolean)
    ?.flat();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    if (debouncedText.length >= 3) {
      fetchNextPage();
    }

    return () => {};
  }, [debouncedText]);

  // handlers
  const handleOnPressCardPoster = (imdbID: string) => {
    navigation.navigate(PATHS.Details, {imdbID});
  };

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleOnPressClear = () => {
    setSearchText('');
    navigation.goBack();
  };

  const handleOnEndReached = () => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleOnRefresh = () => {
    currentPageNumber.current = 1;
    fetchNextPage();
  };

  // actions
  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['movie'],
    });
  };

  // helpers
  const toggleFavorite = (movieId: string) => {
    const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
    const newFavorites = favoritesList.includes(movieId)
      ? favoritesList.filter((id: string) => id !== movieId)
      : [...favoritesList, movieId];
    setFavorites(newFavorites);
    favoritesStorage.set('favorites', JSON.stringify(newFavorites));
    invalidateQueries();
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleOnChangeText}
            placeholderTextColor="lightgray"
            placeholder="Search Movies"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearIcon}
              onPress={handleOnPressClear}>
              <XCircleIcon size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {fetchedData && fetchedData.length > 0 ? (
        <FlatList
          data={fetchedData}
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
              refreshing={isLoading}
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

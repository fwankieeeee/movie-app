import {SafeScreen} from '@/components';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {XCircleIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/hooks/debounce';
import {useFetchMovies} from '@/hooks';
import {Image} from 'react-native-elements';
import PATHS from '@/navigation/paths';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText.toLowerCase(), 500);
  const {dataCount, fetchedData, isLoading, error, handleFetchMovies} =
    useFetchMovies();
  const currentPageNumber = useRef(1);

  useEffect(() => {
    if (debouncedText.length >= 3) {
      handleFetchMovies({
        page: currentPageNumber.current,
        searchTerm: debouncedText,
      });
    }
    currentPageNumber.current = 1;

    return () => {};
  }, [debouncedText]);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

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
    currentPageNumber.current += 1;
    if (currentPageNumber.current <= Math.ceil(dataCount / 10)) {
      handleFetchMovies({
        page: currentPageNumber.current,
        searchTerm: debouncedText,
      });
    }
  };

  const handleOnRefresh = () => {
    currentPageNumber.current = 1;
    handleFetchMovies({
      page: currentPageNumber.current,
      searchTerm: debouncedText,
    });
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressCardPoster(item.imdbID)}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: item.Poster}}
            style={styles.posterImage}
            resizeMode="cover"
          />
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
            <TouchableOpacity style={styles.clearIcon} onPress={handleOnPressClear}>
              <XCircleIcon size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {fetchedData && (fetchedData as Array<Record<string, any>>).length > 0 ? (
        <FlatList
          data={fetchedData as Array<Record<string, any>>}
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
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      )}
    </SafeScreen>
  );
};

export default Search;

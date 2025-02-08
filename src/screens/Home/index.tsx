import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {SafeScreen} from '@/components';
import DATA from '@/services/mockDataPoster';
import {Image} from 'react-native-elements';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import PATHS from '@/navigation/paths';
import {Bars3Icon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';

type TItem = (typeof DATA)[0];

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // handlers
  const handleOnPressCardPoster = () => {
    navigation.navigate(PATHS.Details);
  };

  // TODO: Implement search
  const handleOnPressSearch = () => {};

  // TODO: Implement drawer
  const handleOnPressDrawerOpen = () => {};

  const renderItem = ({item}: {item: TItem}) => {
    return (
      <TouchableOpacity onPress={handleOnPressCardPoster}>
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

  return (
    <SafeScreen>
      {/* Search Bar and Title */}
      <View style={styles.headerView}>
        <TouchableOpacity onPress={handleOnPressDrawerOpen}>
          <Bars3Icon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Rated Movies</Text>
        <TouchableOpacity onPress={handleOnPressSearch}>
          <MagnifyingGlassIcon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* List of Movies from Search */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => `${item.imdbID}`}
        showsVerticalScrollIndicator
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      />
    </SafeScreen>
  );
};

export default Home;

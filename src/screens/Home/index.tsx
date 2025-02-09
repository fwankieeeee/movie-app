import { SafeScreen } from '@/components';
import PATHS from '@/navigation/paths';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import styles from './styles';

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // TODO: Implement search
  const handleOnPressSearch = () => {
    navigation.navigate(PATHS.Search);
  };

  // TODO: Implement drawer
  const handleOnPressDrawerOpen = () => {};

  return (
    <SafeScreen>
      {/* Search Icon and Title */}
      <View style={styles.headerView}>
        <TouchableOpacity onPress={handleOnPressDrawerOpen}>
          <Bars3Icon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Rated Movies</Text>
        <TouchableOpacity onPress={handleOnPressSearch}>
          <MagnifyingGlassIcon strokeWidth={2} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchPromptContainer}>
        <Text style={styles.searchPromptText}>
          Search for your favorite movies and discover new ones
        </Text>
      </View>
    </SafeScreen>
  );
};

export default Home;

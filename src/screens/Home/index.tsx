import { SafeScreen } from '@/components';
import PATHS from '@/navigation/paths';
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import styles from './styles';

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleOnPressSearch = () => {
    navigation.navigate(PATHS.Search);
  };

  return (
    <SafeScreen>
      <View style={styles.headerView}>
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

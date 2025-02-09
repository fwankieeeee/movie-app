import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HeartIcon as HeartOutlineIcon,
  HomeIcon as HomeOutlineIcon,
} from 'react-native-heroicons/outline';
import {
  HeartIcon as HeartSolidIcon,
  HomeIcon as HomeSolidIcon,
} from 'react-native-heroicons/solid';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Details, Favorites, Filter, Home, Search} from '../screens';
import PATHS from './paths';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabStack = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATHS.Home} component={Home} />
      <Stack.Screen name={PATHS.Search} component={Search} />
      <Stack.Screen name={PATHS.Filter} component={Filter} />
      <Stack.Screen name={PATHS.Details} component={Details} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATHS.Favorites} component={Favorites} />
      <Stack.Screen name={PATHS.Details} component={Details} />
    </Stack.Navigator>
  );
};

const MoviesTabs = () => {
  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161715',
        },
      }}>
      <BottomTabStack.Screen
        name={PATHS.Home}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarStyle: {
            backgroundColor: '#161715',
          },
          tabBarIcon: ({color, focused, size}) => {
            const IconComponent = focused ? HomeOutlineIcon : HomeSolidIcon;
            const iconColor = focused ? color : '#fff';
            return <IconComponent color={iconColor} size={size} />;
          },
        }}
      />
      <BottomTabStack.Screen
        name={PATHS.Favorites}
        component={FavoritesStack}
        options={{
          title: 'Favorites',
          tabBarStyle: {
            backgroundColor: '#161715',
          },
          tabBarIcon: ({color, focused, size}) => {
            const IconComponent = focused ? HeartOutlineIcon : HeartSolidIcon;
            const iconColor = focused ? color : '#fff';
            return <IconComponent color={iconColor} size={size} />;
          },
        }}
      />
    </BottomTabStack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={PATHS.MoviesTabs}
        component={MoviesTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;

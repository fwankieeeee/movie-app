import CustomDrawerHeader from '@/components/CustomDrawerHeader';
import Favorites from '@/screens/Favorites';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import {Details, Home, Search} from '../screens';
import PATHS from './paths';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const DrawerStack = createDrawerNavigator();
const BottomTabStack = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PATHS.MoviesTabs}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATHS.MoviesTabs} component={MoviesTabs} />
      <Stack.Screen name={PATHS.Search} component={Search} />
      <Stack.Screen name={PATHS.Details} component={Details} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PATHS.Favorites}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATHS.Favorites} component={Favorites} />
      <Stack.Screen name={PATHS.Search} component={Search} />
      <Stack.Screen name={PATHS.Details} component={Details} />
    </Stack.Navigator>
  );
};

const RootDrawer = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerHeader {...props} />}>
      <DrawerStack.Screen
        name={PATHS.Home}
        component={MainStack}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {
            color: '#fff',
          },
          drawerIcon: ({color, focused, size}) => {
            const IconComponent = focused ? HomeOutlineIcon : HomeSolidIcon;
            const iconColor = focused ? color : '#fff';
            return <IconComponent color={iconColor} size={size} />;
          },
        }}
      />
      <DrawerStack.Screen
        name={PATHS.Favorites}
        component={FavoritesStack}
        options={{
          drawerLabel: 'Favorites',
          drawerLabelStyle: {
            color: '#fff',
          },
          drawerIcon: ({color, focused, size}) => {
            const IconComponent = focused ? HeartOutlineIcon : HeartSolidIcon;
            const iconColor = focused ? color : '#fff';
            return <IconComponent color={iconColor} size={size} />;
          },
        }}
      />
    </DrawerStack.Navigator>
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
        component={Home}
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
        component={Favorites}
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

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;

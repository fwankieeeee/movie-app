import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Details, Home, Search} from '../screens';
import PATHS from './paths';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PATHS.Home}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATHS.Home} component={Home} />
      <Stack.Screen name={PATHS.Search} component={Search} />
      <Stack.Screen name={PATHS.Details} component={Details} />
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

import {Button, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';

type SafeScreenProps = {
  children: any;
};

export const FallbackComponent = (props: {error: Error; resetError: () => void}) => {
  const {error, resetError} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something happened!</Text>
      <Text style={styles.text}>{error.toString()}</Text>
      <Button title="Try again" onPress={resetError} />
    </View>
  );
};

const SafeScreen = ({children}: SafeScreenProps) => {

  return (
    <SafeAreaView mode="padding" style={styles.layoutContainer}>
      <StatusBar
        backgroundColor={styles.status_bar.backgroundColor}
        barStyle="dark-content"
      />
      {children}
    </SafeAreaView>
  );
};
export default SafeScreen;

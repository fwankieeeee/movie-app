import { Button, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

type SafeScreenProps = {
  children: any;
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

import {StatusBar} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

type SafeScreenProps = {
  children: React.ReactNode;
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

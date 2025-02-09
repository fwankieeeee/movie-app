import { Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#161715',
  },
  status_bar: {
    backgroundColor: '#ecf0f1',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
  },
  text: {
    marginVertical: 16,
  },
});

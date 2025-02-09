import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  searchPromptContainer: {
    marginHorizontal: 15,
    marginVertical: 100,
  },
  searchPromptText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
});

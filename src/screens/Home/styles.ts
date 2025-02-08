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
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  posterImage: {
    width: 100,
    height: 150,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    marginBottom: 5,
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 14,
    color: 'gray',
  },
});

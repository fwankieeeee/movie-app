import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
    width: 44,
  },
  posterContainer: {
    width: '100%',
    height: height * 0.55,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: '#161715',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    color: 'white',
    marginLeft: 5,
    marginRight: 10,
  },
  year: {
    color: 'white',
    marginRight: 10,
  },
  runtime: {
    color: 'white',
  },
  genre: {
    color: '#999',
    marginBottom: 15,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  sectionText: {
    color: '#999',
    lineHeight: 22,
  },
  plot: {
    color: '#999',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
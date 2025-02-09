import { Dimensions, StyleSheet } from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    minHeight: '100%',
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
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
    width: 44,
  },
  posterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  overlayTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  overlayYear: {
    color: '#ccc',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statsText: {
    color: 'white',
    fontSize: 14,
  },
  dotSeparator: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  scoreItem: {
    alignItems: 'center',
    gap: 8,
  },
  scoreBox: {
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#999',
    fontSize: 14,
  },
});

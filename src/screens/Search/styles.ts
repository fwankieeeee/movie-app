import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchView: {
    // marginRight: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBlockEnd: 10,
    marginInlineEnd: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingIndicator: {
    transform: [{scale: 1.2}],
    marginHorizontal: 8,
  },
  emptySearchIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#fff',
  },

  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#1f1f1f',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterSearchIcon: {
    paddingInlineEnd: 25,
  },
  skeletonItem: {
    width: '48%',
    height: 100,
    borderRadius: 10,
  },
  skeletonPoster: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  movieItem: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  movieList: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  clearIcon: {
    paddingInlineEnd: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
    width: 44,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});

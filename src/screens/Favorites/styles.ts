import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '50%',
  },
  searchInput: {
    height: 40,
    borderRadius: 50,
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
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
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
});

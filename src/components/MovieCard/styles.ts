import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    flex: 1 / 2,
    margin: 4,
  },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
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
})
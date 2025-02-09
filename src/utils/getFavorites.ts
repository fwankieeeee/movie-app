import { favoritesStorage } from "@/services/storage";
import getStoredObjects from "./getStoredObject";

const getFavorites = () => {
  const favoritesList = getStoredObjects(favoritesStorage, 'favorites') ?? [];
  return favoritesList;
};

export default getFavorites;
import { recentSearchStorage } from "@/services/storage";
import getStoredObjects from "./getStoredObject";

const getRecentSearchesIds = () => {
  const recentSearches = getStoredObjects(recentSearchStorage, 'recent') ?? [];
  return recentSearches;
};

export default getRecentSearchesIds;
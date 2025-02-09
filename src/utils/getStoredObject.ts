
const getStoredObjects = (storage: any, key: string) => {
  const jsonData = storage.getString(key);
  if (!jsonData) return null;
  const dataObject = JSON.parse(jsonData);
  return dataObject;
};

export default getStoredObjects;
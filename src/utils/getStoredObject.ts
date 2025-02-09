import { NativeMMKV } from "react-native-mmkv/lib/typescript/src/Types";

const getStoredObjects = (storage: NativeMMKV, key: string) => {
  const jsonData = storage.getString(key);
  if (!jsonData) return null;
  const dataObject = JSON.parse(jsonData);
  return dataObject;
};

export default getStoredObjects;
import { get, set, keys, del, clear } from "idb-keyval";

const indexedDBStorage = {
  clear() {
    return clear();
  },
  getItem(key: IDBValidKey) {
    return get(key);
  },
  setItem(key: IDBValidKey, value: any) {
    return set(key, value);
  },
  keys() {
    return keys();
  },
  remove(key: IDBValidKey) {
    return del(key);
  },
  removeItem(key: IDBValidKey) {
    return del(key);
  }
};

export default indexedDBStorage;

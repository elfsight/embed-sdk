const TIME_DAY = 86400;
const KEY_PREFIX = 'elfsight-embed-sdk';

class MemoryStorage {
  constructor() {
    this.storage = new Map();
  }

  setItem(key, value) {
    this.storage.set(key, value);
  }

  getItem(key) {
    return this.storage.get(key);
  }

  removeItem(key) {
    this.storage.delete(key);
  }
}

export class Storage {
  constructor() {
    this.driver = Storage.availableDriver();
  }

  static availableDriver() {
    const key = 'embedSDK.availableStorageTest';

    try {
      try {
        localStorage.setItem(key, 'test');
        localStorage.getItem(key);
        localStorage.removeItem(key);

        return localStorage;
      } catch (_) {
        sessionStorage.setItem(key, 'test');
        sessionStorage.getItem(key);
        sessionStorage.removeItem(key);

        return sessionStorage;
      }
    } catch (_) {
      return new MemoryStorage();
    }
  }

  static getExpirationDate(time) {
    return (Date.now() / 1000) + time;
  }

  static isExpired(date) {
    return date && (Date.now() / 1000) > date;
  }

  static prefixKey(key) {
    return key.includes(KEY_PREFIX) ? key : `${KEY_PREFIX}-${key}`;
  }

  set(key, value) {
    const data = {
      value,
      expirationDate: Storage.getExpirationDate(TIME_DAY)
    };

    this.driver.setItem(Storage.prefixKey(key), JSON.stringify(data));
  }

  async get(key, getter) {
    const prefixedKey = Storage.prefixKey(key);
    const rawData = this.driver.getItem(prefixedKey);

    if (!rawData) {
      return this.callUpdate(prefixedKey, getter);
    }

    const data = JSON.parse(rawData);
    const { value, expirationDate } = data;

    if (Storage.isExpired(expirationDate)) {
      this.callAsyncUpdate(prefixedKey, getter);
    }

    return value;
  }

  async callUpdate(key, getter) {
    const data = await getter();

    this.set(key, data);

    return data;
  }

  callAsyncUpdate(key, getter) {
    return this.callUpdate(key, getter);
  }
}

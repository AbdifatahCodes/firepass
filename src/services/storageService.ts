import * as cryptoService from './cryptoService';

const isFirefox = typeof browser !== 'undefined';
const storage = isFirefox ? browser.storage.local : chrome.storage.local;

export const setItem = async (key, value) => {
  try {
    const encryptedValue = await cryptoService.encrypt(value);
    await storage.set({ [key]: encryptedValue });
  } catch (error) {
    console.error('Error setting item in local storage:', error);
  }
};

export const getItem = async (key) => {
  try {
    return new Promise((resolve, reject) => {
      storage.get(key, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (!result[key]) {
          resolve(null);
        } else {
          cryptoService.decrypt(result[key].data, result[key].iv)
            .then(decryptedData => resolve(decryptedData))
            .catch(error => reject(error));
        }
      });
    });
  } catch (error) {
    console.error('Error getting item from local storage:', error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await storage.remove(key);
  } catch (error) {
    console.error('Error removing item from local storage:', error);
  }
};

const isWeb = typeof window !== 'undefined';

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      return localStorage.getItem(key);
    } else {
      const SecureStore = await import('expo-secure-store');
      return SecureStore.getItemAsync(key);
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      localStorage.setItem(key, value);
    } else {
      const SecureStore = await import('expo-secure-store');
      await SecureStore.setItemAsync(key, value);
    }
  },

  deleteItem: async (key: string): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      const SecureStore = await import('expo-secure-store');
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export default storage;

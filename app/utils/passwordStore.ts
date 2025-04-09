import storage from './storage';

const namespace = 'passman';

type PasswordEntry = {
  password: string;
  category: string;
  createdAt: string;
  starred: boolean;
};

const getStoredKeys = async (): Promise<string[]> => {
  const keysString = await storage.getItem(`${namespace}:keys`);
  return keysString ? JSON.parse(keysString) : [];
};

const saveStoredKeys = async (keys: string[]) => {
  await storage.setItem(`${namespace}:keys`, JSON.stringify(keys));
};

export const savePassword = async (key: string, password: string, category: string, starred: boolean = false) => {
  const entry: PasswordEntry = {
    password,
    category,
    starred,
    createdAt: new Date().toISOString(),
  };

  await storage.setItem(`${namespace}:${key}`, JSON.stringify(entry));

  // Update index
  const keys = await getStoredKeys();
  if (!keys.includes(key)) {
    keys.push(key);
    await saveStoredKeys(keys);
  }
};

export const getPassword = async (key: string): Promise<PasswordEntry | null> => {
  const item = await storage.getItem(`${namespace}:${key}`);
  return item ? JSON.parse(item) : null;
};

export const listPasswords = async (): Promise<{ key: string; entry: PasswordEntry | null }[]> => {
  const keys = await getStoredKeys();
  const entries = await Promise.all(
    keys.map(async (key) => ({
      key,
      entry: await getPassword(key),
    }))
  );
  return entries;
};

export const filterPasswordsByCategory = async (category: string) => {
  const all = await listPasswords();
  return all.filter(item => item.entry?.category === category);
};
